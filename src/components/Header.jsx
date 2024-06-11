    import React from 'react';
    import { Navbar, Nav } from 'react-bootstrap';
    import { Link } from 'react-router-dom';

    const Header = () => {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/" className='ms-4'>JENCY </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/create">Create</Nav.Link>
          </Nav>
        </Navbar>
      );
    };

    export default Header;
