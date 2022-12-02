import { useState, useEffect } from "react";
import React from 'react'
import './Login.css'

function Login() {
  const [userName , setUserName] = useState("");
  const [password , setPassword] = useState("");


  function sendLoginRequest() {
    console.log("Sending login request");
  }

  return (
    <div className='login-form'>
      <form>
      <div class="imgcontainer">
        <img src='/images/profile.png' alt="Avatar" class="avatar"/>
      </div>
        <div className='container'>
          <label htmlFor='uname'><b>Username</b></label>
          <input type='text' name='uname' placeholder='Enter username' required/>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required/>

          <button type="submit" onClick={() => sendLoginRequest()}>Login</button>
          <label>
            <input type="checkbox" checked="checked" name="remember"/> Remember me
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