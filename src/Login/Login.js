import { useState, useEffect } from "react";
import React from 'react'
import './Login.css'
import { useLocalState } from "../util/utilLocalStorage";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLoginRequest(e) {
    e.preventDefault();
    const reqBody = {
      username: username,
      password: password,
    };

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
        window.location.href = "recipes";
      }).catch((message) => {
        alert(message);
      });

  }

  return (
    <div className='login-form'>
      <form>
        <div className="imgcontainer">
          <img src='/images/profile.png' alt="Avatar" className="avatar" />
        </div>
        <div className='container'>
          <label htmlFor='uname'><b>Username</b></label>
          <input type='email' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" onClick={(e) => sendLoginRequest(e)}>Login</button>
          <label>
            <input type="checkbox" checked="checked" /> Remember me
          </label>
        </div>
        <div className="container">
          <span className="register"><a href="#">Register</a></span>
          <span className="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
    </div>
  )
}

export default Login