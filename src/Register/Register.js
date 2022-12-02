import { useState, useEffect } from "react";
import React from 'react'
import './Register.css'

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    function sendRegisterRequest() {
        if (password != repeatPassword) {
            alert("repeated password must be identical to password");
        } else {
            console.log("Sending register request");
            const reqBody = {
                email: username,
                password: password,
            };
            console.log(reqBody);

            fetch('/api/register', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
                .then((response) => console.log(response.json()))
        }
    }

    return (
        <div className='login-form'>
            <form>
                <div className="imgcontainer">
                    <img src='/images/profile.png' alt="Avatar" className="avatar" />
                </div>
                <div className='container'>
                    <label htmlFor='uname'><b>Email</b></label>
                    <input type='email' name='uname' placeholder='Enter email' required onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="psw"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => setRepeatPassword(e.target.value)} />

                    <button type="submit" onClick={() => sendRegisterRequest()}>Register</button>
                </div>
                <div className="container">
                    <span className="register">Already have an account? <a href="/login">Login</a></span>
                </div>
            </form>
        </div>
    )
}

export default Register