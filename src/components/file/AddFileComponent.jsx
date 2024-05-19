import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./AddFileComponent.css";
import axios from 'axios';

const AddFileComponent = () => {
    const [file, setFile] = useState(null);
    const [customerId, setCustomerId] = useState('');
    const [isValid, setIsValid] = useState(false);
    
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleCustomerIdChange = (event) => {
        setCustomerId(event.target.value);
    };

    useEffect(() => {
        // Form geçerliliğini kontrol et
        if (file && customerId) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [file, customerId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('customerId', customerId);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }
        
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            };
        
            const response = await axios.post("http://localhost:8080/v1/file/upload", formData, config);
        
            console.log("File uploaded: ", response.data);
            navigate("/files");
        } catch (error) {
            if (error.response) {
                console.log("Failed to upload file:", error.response.data);
            } else if (error.request) {
                console.log("Request failed:", error.request);
            } else {
                console.log("Error:", error.message);
            }
        }
    };

    return (
        <>
            <div className="center-form">
                <h1>Add File</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile">
                        <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formCustomerId">
                        <Form.Control
                            type="text"
                            placeholder="Enter customer ID"
                            value={customerId}
                            onChange={handleCustomerIdChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={!isValid}>
                        Upload
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default AddFileComponent;
