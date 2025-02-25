import React, { useState } from "react";
import "./login.css";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newdata = {
      email: formData.email,
      password: formData.password,
    };
    checkuser(newdata);
  };

  const checkuser = (newdata) => {
    console.log("Attempting to find user...");
    Axios.post("http://localhost:3002/checkuser", newdata)
      .then((response) => {
        console.log("User found:");
        onLogin();
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error checking user:", error.response?.data || error.message);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <h3>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </h3>
      </form>
    </div>
  );
};

export default Login;
