import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React, { useState } from "react";
import Dentries from './Dentries';
import All from './All';
import './main2.css';
import { Link } from 'react-router-dom';
import About from './about';
import Feedback from './feedback';
import Veiwfeedback from './veiwfeedback';
import Login2 from './login2';
import Signup2 from './signup2';
import Home from './home';

function Main2() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn"); 
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <nav>
            <ul className="nav-links">
              <li ><Link to ="/">Home</Link></li>
              <li><Link to ="/About">About</Link></li>
              <li><Link to ="/veiwfeedback">Feedback</Link></li>
               <li><Link to ="/Dentries">Add</Link></li>
                <li><Link to ="/All">All</Link></li>
            </ul>
            {!isLoggedIn ? (
                <Link to="/login2" className="profile-icon">👤 Login</Link>
              ) : (
                <button className="profile-icon1" onClick={handleLogout}>
                    👤 Logout
                  </button>
                 )}
          </nav>
        </header>

          <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path ="/Dentries" element={<Dentries />}/>
            <Route path="/All" element={<All />} />
            <Route path="/About" element={<About />} />
            <Route path="/Veiwfeedback" element={<Veiwfeedback />} />
            <Route path="/Feedback" element={<Feedback isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup2" element={<Signup2 />} />
            <Route path="/login2" element={<Login2 onLogin={handleLogin} />}  />
          </Routes>
      
          <div className='box1'>
          <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</p>
        <nav>
          <a href="/about" className="footer-link">About Us</a> | 
          <a href="/contact" className="footer-link">Contact</a> | 
          <a href="/privacy" className="footer-link">Privacy Policy</a>
       
        </nav>
      </div>
    </footer>
         </div>
        
      </div>
    </Router>
  );
}

export default Main2;
