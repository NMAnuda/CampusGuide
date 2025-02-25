import React, { useState } from 'react';
import './search.css';
import Axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function Search() {

  const navigate = useNavigate();
   const [formData, setFormData] = useState(
    {
      district: '',
      stream: '',
      zValue: ''
    }
  )

const handleinput = (event) => {
  const {id,value} = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,[id] : value
  }))
}

const getcourse = (event) =>
  {
    
    event.preventDefault(); 
    const newdata = {
      id: Date.now(),
      district: formData.district,
      stream: formData.stream,
      zValue: formData.zValue,  
    }
    searchdata(newdata);
    console.log(newdata);
  }
  const searchdata = (newdata) =>{
    console.log("ekath hari");
    Axios.post("http://localhost:3002/find" , newdata)
    .then((response) => {
      console.log("user searched" , response.data);
      navigate('/find'); 
      console.log("ekath hariiiiiiiiiiiiiiiiii");
    })
    .catch((error) =>
    {
      console.error("error find course " , error);
    })
    
  } 
  
  
    return (

      <div className='upper'>
        <div className="form-container">
            <form  onSubmit={getcourse} >
          <h2 className="form-title">Submit Your Information</h2>
    
          <div className="form-group">
            <label htmlFor="district">Enter District</label>
            <input  onChange={handleinput} type="text" id="district" className="input-box" placeholder="Enter district" />
          </div>
    
          <div className="form-group">
            <label htmlFor="stream">Enter Stream</label>
            <input  onChange={handleinput} type="text" id="stream" className="input-box" placeholder="Enter stream" />
          </div>
    
          <div className="form-group z-range-group">
            <label>Enter Z-Value</label>
            <div className="z-range-inputs">
              <input  onChange={handleinput} type="text" id="zValue" className="z-range-box"  />
            </div>
          </div>
        <div className='box3'>
        <button className="submit-button" type='submit'>Submit</button>
        </div>
          </form>
        </div>
        </div>
      );
    }

export default Search;
