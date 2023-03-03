import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./login.scss";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault();
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials);
            if(res.data.isAdmin){
              dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
              navigate("/")
            }else{
              dispatch({ type: "LOGIN_FAILURE", payload: {message: "You are not allowed!"} });
            }
            
            
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }
    return (
        <>
            <div className="fullscreen-container">
                <div className="login-container">
                    <h1 className="header">Login</h1>
                    <form className="form">
                        <div className="input-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" onChange={handleChange} placeholder="Type your username" />
                        </div>
                        <div className="input-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" onChange={handleChange} placeholder="Type your password" />
                        </div>
                        <button disabled={loading} onClick={handleClick} className="button">Login</button>
                        {error && <span>{error.message}</span>}
                    </form>
                    <span className="reg-header">
                        Or <Link to="/register" style={{ textDecoration: "none" }}> register </Link>
                        if you don't have an account already!
                    </span>
                </div>
            </div>
        </>


    )
}
