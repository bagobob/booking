import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./login.css";
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
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }
    return (
        <>
            <div className="login">
                <div className="lContainer">
                    <input type="text" placeholder="username" className="lInput" id="username" onChange={handleChange} />
                    <input type="password" placeholder="password" className="lInput" id="password" onChange={handleChange} />
                    <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                    {error && <span>{error.message}</span>}
                    <span className="reg-header">
                        Or <Link to="/register" style={{ textDecoration: "none" }}> register </Link>
                        if you don't have an account already!
                    </span>
                </div>
            </div>
        </>


    )
}
