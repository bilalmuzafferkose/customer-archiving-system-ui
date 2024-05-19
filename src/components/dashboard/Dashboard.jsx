import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Unauthorized");
                }
                else {
                console.log(`token: `, token);
                }

                const response = await fetch("http://localhost:8080/v1/customer/getAll", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch customers");
                }

                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.log("Error fetching customers", error.message);
            }
        };
        fetchCustomers();
    }, []);

    const handleDelete = async (citizenshipNumber) => {
        console.log(citizenshipNumber);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch(`http://localhost:8080/v1/customer/delete/${citizenshipNumber}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete customer");
            }

            // listeden silinmesi icin
            setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.citizenshipNumber !== citizenshipNumber))
        } catch (error) {
            console.log("error deleting customer: ", error.message);
        }
    }

    const handleUpdate = (citizenshipNumber) => {
        navigate(`/customer/${citizenshipNumber}`);
    }

    return (
    <>
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Customers</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Citizenship Number</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Birthday</th>
                                    <th>Files</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.citizenshipNumber}>
                                        <td>{customer.citizenshipNumber}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.surname}</td>
                                        <td>{customer.birthDay}</td>
                                        <td>
                                            {customer.files.length > 0 ? (
                                                <>
                                                    <p>{customer.files.length} files:</p>
                                                    <div>
                                                        {customer.files.map((file) => (
                                                            <li key={file.id}>{file.name}</li>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <p>No files</p>
                                            )}
                                        </td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => handleUpdate(customer.citizenshipNumber)}>Update</Button> {" "}
                                            <Button variant="outline-danger" onClick={() => handleDelete(customer.citizenshipNumber)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
    )
}

export default Dashboard;
