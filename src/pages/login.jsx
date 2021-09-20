import React from "react";
import { Form, InputGroup, FormControl, Modal, Button } from "react-bootstrap";
import {connect}from "react-redux"

import "../style/login.scss"
import {Link, Redirect} from "react-router-dom"

import {onLogin}from "../redux/action"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
}
passValid = (e) => {
  let number = /[0-9]/;
  let symb = /[!@#$%^&*]/;

  if (!symb.test(e.target.value) || !number.test(e.target.value) || e.target.value < 6) return this.setState({ error: true });

  this.setState({error : false})
};

onLogin = () => {
  let username = this.refs.email.value;
  let password = this.refs.password.value;

  if (!username || !password){
      return this.setState({error :true})
    }
    


    let obj ={
        username,
        password,
        // cart :[]
        email : "fernanteng44@gmail.com",
        verified :"verified"
    }

    this.props.onLogin(obj)


};
  render() {
      if(this.props.email){
          return <Redirect to="/"/>
      }
      console.log(this.props.email)
    return (
      <div className="login">
        <div className="login-form">
          <h1>Login</h1>
          {/* <Form.Label>Email address</Form.Label> */}
          <label>Email Adress</label>
          <Form.Control type="email" placeholder="Enter email" ref="email" />
          {/* <Form.Label>Password</Form.Label> */}
          <label>Password</label>
          <Form.Text>{this.state.error ? "password harus mengandung 6 karakter dan angka" : ""}</Form.Text>
          <Form.Control type="password" placeholder="Password" ref="password" onChange={(e)=> this.passValid(e)}  />
          <Button variant="primary" type="submit" onClick={this.onLogin}>
            Submit
          </Button>

          {/* <Modal show={this.state.error} onHide={()=>this.setState({error :true})} >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Password harus mengandung 6 karakter dan angka </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>this.setState({error : true})}>
            Oke
          </Button>
        </Modal.Footer>
      </Modal> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps =(state)=>{
    return{
        email : state.userReducer.email,
    }
}

export default connect (mapStateToProps,{onLogin}) (Login);
