
import React, { useState } from "react";
import "./signup.css";
import  Axios  from "axios";
import { useNavigate, Link } from "react-router-dom";
const Signup = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    possition:"",
    reenterpassword:""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.reenterpassword)
    {
        setErrorMessage("");

   const newdata = {
    username:formData.username,
    email: formData.email,
    password:formData.password,
    possition:formData.possition
   };
   addUser(newdata);
}
else{
    setErrorMessage("Passwords do not match");
    return;
}
  };

  const addUser = (newdata) =>
  {
    console.log("ethn hari");
    Axios.post("http://localhost:3002/addhead",newdata)
    .then((response) => {
        console.log("User added:");
        navigate("/login2"); 
    })
    .catch((error) => {
        console.error("Error adding user:", error);
    });
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
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
          <label htmlFor="possition">Email</label>
          <input
            type="possition"
            id="possition"
            name="possition"
            value={formData.possition}
            onChange={handleChange}
            placeholder="Enter your possition"
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
        <div className="form-group">
          <label htmlFor="reenterpassword">Reenter-Password</label>
          <input
            type="reenterpassword"
            id="reenterpassword"
            name="reenterpassword"
            value={formData.reenterpassword}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
