import React, { useEffect, useState } from "react";
import "./veiwfeedback.css";
import Axios from "axios";
import { Link , useLocation  } from 'react-router-dom'; 

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("/feedback") // Make sure this matches your backend route
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  return (
    <div className="app">
    <div className="outerbox1">
                <div className="sidebar">
                    <ul>
                    <li><Link to ="/Dentries">Add</Link></li>
                    <hr className="sidebar-line" />
                    <li><Link to="/">Notify</Link></li>
                    <hr className="sidebar-line" />
                    <li><Link to ="/All" >All</Link></li>
                    </ul>
                </div>
              
            </div>
    <div className="feedback-table-container">
      <h1>Feedback List</h1>
      {feedbacks.length > 0 ? (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
    </div>
  );
};

export default FeedbackTable;
