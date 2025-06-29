import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from "./pages/App";
import Search from "./pages/search";
import Find from './pages/find'; 
import About from './pages/about';
import Feedback from './pages/feedback';
import Signup from './pages/signup';
import Login from './pages/login';
import Course from './pages/course';
import { Link } from 'react-router-dom';
import './main.css';
import React, { useState } from 'react';

function Main() {
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
          <div className='navbox'>
            <nav>
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
              </ul>
              {!isLoggedIn ? (
                <Link to="/login" className="profile-icon">👤 Login</Link>
              ) : (
                <button className="profile-icon1" onClick={handleLogout}>
                    👤 Logout
                  </button>
                 )}
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/search" element={<Search />} />
          <Route path="/find" element={<Find />} />
           <Route path="/course" element={<Course />} />
          <Route path="/About" element={<About />} />
          <Route path="/Feedback" element={<Feedback isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />}  />
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

export default Main;
