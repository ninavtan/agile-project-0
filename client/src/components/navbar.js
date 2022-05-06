import {Nav, Navbar, Container, Button} from 'react-bootstrap';
import styled from 'styled-components';


const NavBar = () => {
return (<>
  <Navbar bg="light">
    <Container>
      <Navbar.Brand href="/boards">mello</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    
</Navbar></>
);
}

export default NavBar;