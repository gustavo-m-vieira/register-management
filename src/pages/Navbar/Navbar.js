import React from "react";
import { Navbar as BootStrapNavbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

import { useAppContext } from "../../libs/contextLib";

export default function Navbar() {
  const history = useHistory();
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  function handleLogout() {
    userHasAuthenticated(false);
    localStorage.setItem('userIsAuthenticated', 'unauthenticated');
    history.push("/login");
  }

  return (
    <BootStrapNavbar collapseOnSelect bg="light" expand="md" className="mb-3">
      <LinkContainer to="/">
        <BootStrapNavbar.Brand className="font-weight-bold text-muted">
          Register Management
        </BootStrapNavbar.Brand>
      </LinkContainer>
      <BootStrapNavbar.Toggle />
      <BootStrapNavbar.Collapse className="justify-content-end">
        <Nav activeKey={window.location.pathname}>
        {
          isAuthenticated ? (
            <>
              <LinkContainer to="/products">
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/clients">
                <Nav.Link>Clients</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )
        }
        </Nav>
      </BootStrapNavbar.Collapse>
    </BootStrapNavbar>
  )


}