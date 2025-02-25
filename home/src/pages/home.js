import React from 'react';
import './App.css';
import {useNavigate} from "react-router-dom";



function Home( {isLoggedIn, setIsLoggedIn}) {

const navigate=useNavigate();
  const navfunction = () =>
    {
        if (!isLoggedIn) {
            alert("You must be logged in to site.");
            navigate("/login2");
            return;}
            else{
                navigate("/All");
            }
   
      
    }


  return (
    <>
      
     <div className='box2'>
     <div className="main-content">
          <div className="campus-section">
           

            <button onClick={() => navfunction()} className="search-button">menu</button>

          </div>
        </div>
     </div>
        
    
      
    </>
  );
}

export default Home;
