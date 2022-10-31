import React from 'react';
import {Container,Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Header = () => {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Reservation System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-wrapper">
            
            <Link to="/setting">Reservation Setting</Link>
            <Link to="/create-reservation">Create Reservation</Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
