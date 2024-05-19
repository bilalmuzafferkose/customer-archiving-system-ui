import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const FileComponent = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Unauthorized");
        }

        const response = await fetch("http://localhost:8080/v1/file/getAll", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }

        const data = await response.json();
        console.log(`files: `, data);
        setFiles(data);
      } catch (error) {
        console.log("Error fetching files: ", error.message);
      }
    }
    fetchFiles();
  }, []);

  const handleDelete = async (fileId) => {
    /* try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Unauthorized");
      }

      const response = await fetch(`http://localhost:8080/v1/file/delete/${fileId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.log("Error deleting file: ", error.message);
    } */
    alert("This feature is only available for API requests.");
  }

  const handleUpdate = (fileId) => {
    //navigate(`/file/${fileId}`);
    alert("This feature is only available for API requests.");
  }

  const handleDownload = (fileName) => {
    window.location.href = `http://localhost:8080/v1/file/${fileName}`;
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center">Files</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td>{file.name}</td>
                    <td>
                      <Button variant="outline-secondary" onClick={() => handleUpdate(file)}>Update</Button> {" "}
                      <Button variant="outline-danger" onClick={() => handleDelete(file.id)}>Delete</Button> {" "}
                      <Button variant="outline-primary" onClick={() => handleDownload(file.name)}>Download</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FileComponent;
