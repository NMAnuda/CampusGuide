import React, { useState } from 'react';
import './search.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    district: '',
    stream: '',
    subject1: '',
    subject2: '',
    subject3: '',
    zValue: ''
  });

  const handleinput = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const getcourse = (event) => {
    event.preventDefault();
    const newdata = {
      id: Date.now(),
      district: formData.district,
      stream: formData.stream,
      subject1: formData.subject1,
      subject2: formData.subject2,
      subject3: formData.subject3,
      zValue: formData.zValue,
    };
    searchdata(newdata);
    console.log(newdata);
  };

  const searchdata = (newdata) => {
    console.log("ekath hari");
    Axios.post("http://localhost:3002/find", newdata)
      .then((response) => {
        console.log("user searched", response.data);
        navigate('/find');
        console.log("ekath hariiiiiiiiiiiiiiiiii");
      })
      .catch((error) => {
        console.error("error find course", error);
      });
  };

  return (
    <div className="search-container">
      <div className="form-wrapper">
        <form onSubmit={getcourse} className="search-form">
          <h2 className="form-title">Submit Your Information</h2>

          <div className="form-group">
            <label htmlFor="district">Enter District</label>
            <input
              onChange={handleinput}
              value={formData.district}
              type="text"
              id="district"
              className="input-field"
              placeholder="Enter district"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stream">Enter Stream</label>
            <input
              onChange={handleinput}
              value={formData.stream}
              type="text"
              id="stream"
              className="input-field"
              placeholder="Enter stream"
            />
          </div>

          <div className="form-group subjects-group">
            <label>Enter Subjects</label>
            <div className="subjects-inputs">
              <input
                onChange={handleinput}
                value={formData.subject1}
                type="text"
                id="subject1"
                className="input-field subject-input"
                placeholder="Subject 1"
              />
              <input
                onChange={handleinput}
                value={formData.subject2}
                type="text"
                id="subject2"
                className="input-field subject-input"
                placeholder="Subject 2"
              />
              <input
                onChange={handleinput}
                value={formData.subject3}
                type="text"
                id="subject3"
                className="input-field subject-input"
                placeholder="Subject 3"
              />
            </div>
          </div>

          <div className="form-group z-range-group">
            <label htmlFor="zValue">Enter Z-Value</label>
            <input
              onChange={handleinput}
              value={formData.zValue}
              type="text"
              id="zValue"
              className="input-field z-range-input"
              placeholder="Z-Value"
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Search;