import React, { useState } from "react";
import "./feedback.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const FeedbackPage = ({ isLoggedIn, setIsLoggedIn }) => {

  const navigate=useNavigate();
  const [formData, setdetials] = useState(
    {
        name:'',
        email:'',
        message:''
    }
  );
  const [submitted, setSubmitted] = useState(false);
const [users, setusers] = useState([]);

const handleinput = (event) =>{
    const {id,value}= event.target;
    setdetials((prevformdata) =>({
        ...prevformdata,
        [id]:value
    }))
}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("You must be logged in to submit feedback.");
      navigate("/login"); 
      return;}
    const newdata ={
        id:Date.now(),
        name: formData.name,
        message: formData.message,
        email: formData.email
    }
    setusers((prevUsers)=> [...prevUsers, newdata]);
    addData(newdata);
    setSubmitted(true);
  };
const addData = (newdata) =>{
    console.log(newdata);
    Axios.post("http://localhost:3002/feedback" , newdata)
    .then((response) => {
        console.log("User added:", response.data);
    })
    .catch((error) => {
        console.error("Error adding user:", error);
    });
}
  return (

    <div className="fdouter">
    <div className="feedback-container">
      <h1>Feedback</h1>
      {submitted ? (
        <div className="thank-you-message">
          <h2>Thank you for your feedback!</h2>
          <p>We appreciate your input and will get back to you if necessary.</p>
        </div>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleinput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleinput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleinput}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
    </div>
  );
};

export default FeedbackPage;