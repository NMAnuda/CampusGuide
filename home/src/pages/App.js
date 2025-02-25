import React from 'react';
import './App.css';
import {useNavigate} from "react-router-dom";



function App() {

const navigate=useNavigate();
  const navfunction = () =>
    {
      navigate("/search");
      
    }


  return (
    <>
      
     <div className='box2'>
     <div className="main-content">
          <div className="campus-section">
            <h1>campus search book</h1>

            <button onClick={() => navfunction()} className="search-button">search</button>

          </div>
        </div>
     </div>
        
    
      
    </>
  );
}

export default App;
