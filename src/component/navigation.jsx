import React from "react";
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logout} from "../redux/action"

class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="transparent" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Toko-Sepatu</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">{this.props.username ? this.props.username : "Home"}</Nav.Link>
                <NavDropdown title="Cart" id="basic-nav-dropdown">
                  {
                  this.props.email 
                  ?
                  <>
                  <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/cart">Cart</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/history">History</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/payment">Payment</NavDropdown.Item>
                  
                  </>
                  : 
                  <>
                  <NavDropdown.Item as={Link} to="/login" >Login</NavDropdown.Item>
                  </>


                }
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps =(state)=>{
  return{
    email : state.userReducer.email,
    username : state.userReducer.username
  }
}

export default connect(mapStateToProps, {logout}) (NavigationBar)