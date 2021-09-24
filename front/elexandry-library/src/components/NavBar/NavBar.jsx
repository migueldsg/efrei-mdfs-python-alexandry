import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { StyledContainer } from './NavBar.style';

const NavBar = () => {
  return (
    <StyledContainer>
      <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Alexandry Library</Navbar.Brand>
            <Nav className="nav-links">
              <NavLink to="/books">
                Les livres
              </NavLink>
            </Nav>
          </Container>
      </Navbar>
  </StyledContainer>
  )
}

export { NavBar };
