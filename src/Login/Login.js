import { useState, useEffect } from "react";
import React from 'react'
import './Login.css'
import { useLocalState } from "../util/utilLocalStorage";
import ajax from "../Services/fetchService";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
// import { Form } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [user, setUser] = useLocalState("", "user");
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  function sendLoginRequest(e) {
    e.preventDefault();
    const reqBody = {
      username: username,
      password: password,
    };

    // ajax('/api/auth/login', "POST", jwt, reqBody)
    fetch('/api/auth/login', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        }
        else {
          return Promise.reject("Invalid login attempt: " + response.status);
        }
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        setUser(username);
        window.location.href = "recipes";
      }).catch((message) => {
        alert(message);
      });

  }

  return (
    <Container >
      <Form className='login-form'>

        <div className="imgcontainer">
          <img src='/images/profile.png' alt="Avatar" className="avatar" />
        </div>

        <Container>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username"><b>Username</b></Form.Label>
            <Form.Control id="username" type="email" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password"><b>Password</b></Form.Label>
            <Form.Control id="password" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Button className="login-button" type="submit" onClick={(e) => sendLoginRequest(e)}>Login</Button>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="switch" id="custom-switch" checked={checked} onChange={handleChange} label="Remember me" />
          </Form.Group>
          <div>
            <span className="register"><a href="#">Register</a></span>
            <span className="psw">Forgot <a href="#">password?</a></span>
          </div>
        </Container>
      </Form>
    </Container>
  )
}

export default Login