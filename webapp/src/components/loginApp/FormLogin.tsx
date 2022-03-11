import React, { useState } from "react";
import { AuthButton, Link, LoggedOut } from "@solid/react";
import {  LoggedIn } from "@solid/react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import RedirectHook from "./RedirectHook";



export default function LoginForm( Login: any, error: any ) {
  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e:any) => {
    e.preventDefault();
    Login(details);
  };

  return (

    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  );
}