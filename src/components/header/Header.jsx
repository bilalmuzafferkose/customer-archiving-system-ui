import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };
  
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Customer Archiving System
            </Navbar.Brand>
            <Nav className="me-auto">
              {token ? (
                <>
                  <Nav.Link as={Link} to="/" className="nav-link">Customers</Nav.Link>
                  <Nav.Link as={Link} to="/add-customer" className="nav-link">Add Customer</Nav.Link>
                  <Nav.Link as={Link} to="/files" className="nav-link">Files</Nav.Link>
                  <Nav.Link as={Link} to="/add-file" className="nav-link">Add File</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  };

export default Header;
