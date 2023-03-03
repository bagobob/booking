import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";

export const Register = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
    });
    const [error, setError] = useState(undefined);
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault();
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
      e.preventDefault();
      try {
        await axios.post("/auth/register",credentials);
        navigate("/login")
      } catch (error) {
        setError(error.response.data)
      }
    }

  return (
    <div className="register">
        <div className="rContainer">
                <input type="text" placeholder="username" className="rInput" id="username" onChange={handleChange} />
                <input type="text" placeholder="email" className="rInput" id="email" onChange={handleChange} />
                <input type="password" placeholder="password" className="rInput" id="password" onChange={handleChange} />
                <button onClick={handleClick} className="rButton">Register</button>
                {error && <span>{error.message}</span>}
                <span>
                    Or <Link to="/login" style={{  textDecoration: "none" }}> login </Link>
                      if you already have an account!
                </span>
            </div>
    </div>
  )
}
