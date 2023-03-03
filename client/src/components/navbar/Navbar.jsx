import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
	const { user, dispatch } = useContext(AuthContext);

	const handleLogout = (e)=>{
		e.preventDefault();
		dispatch({ type: "LOGOUT" });
	}
	return (
		<div className="navbar">
			<div className="navContainer">
				<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
					<span className="logo">onNangOu</span>
				</Link>
				{user ? (<div className="navItems">
					<span>{user.username}</span>
					<button className="navButtonLogout" onClick={handleLogout}>Logout</button>
				</div>)
					: (<div className="navItems">
						<Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
							<button className="navButton">Register</button>
						</Link>

						<Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
							<button className="navButton">Login</button>
						</Link>
					</div>)}

			</div>
		</div>
	)
}
