import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleSearch = (type) => {
    if (type === 'campus') {
      navigate('/Search', { state: { searchType: 'campus' } });
    } else {
      navigate('Course');
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="welcome-card">
          <h1 className="title">Campus & Course Finder</h1>
          <p className="subtitle">Explore campuses or find the perfect course for you!</p>
          <div className="button-group">
            <button
              onClick={() => handleSearch('campus')}
              className="search-button"
            >
              Search Campus
            </button>
            <button
              onClick={() => handleSearch('course')}
              className="search-button"
            >
              Search Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;