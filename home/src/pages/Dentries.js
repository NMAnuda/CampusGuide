import React, { useState } from 'react';
import './dentries.css';
import Axios from "axios";
import { Link } from 'react-router-dom';


function Dentries() {
    const [formData, setFormData] = useState({
        district: '',
        stream: '',
        zValue1: '',
        zValue2: ''
    });
    const [users, setusers] = useState([]);

    const handleinput = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newdata = {
            id: Date.now(),
            district: formData.district,
            stream: formData.stream,
            course: formData.course,
            zValue1: formData.zValue1,
            zValue2: formData.zValue2,
        };

        setusers((prevUsers) => [...prevUsers, newdata]);
        addData(newdata);
    };

    const addData = (user) => {
        Axios.post("http://localhost:3002/enter", user)
            .then((response) => {
                console.log("User added:", response.data);
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
    };

    return (
        <div className="app-container">
            <div className='outerbox'>
            <div className="sidebar">
                <ul>
                    <li><Link to ="/">Add</Link></li>
                    <hr className="sidebar-line" />
                    <li><Link to="/veiwfeedback">Notify</Link></li>
                    <hr className="sidebar-line" />
                    <li><Link to ="/All" >All</Link></li>
                </ul>
            </div>
            </div>
            {/* Form Section */}
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h2 className="form-title">Submit Your Information</h2>

                    <div className="form-group">
                        <label htmlFor="district">Enter District</label>
                        <input
                            onChange={handleinput}
                            value={formData.district}
                            type="text"
                            id="district"
                            className="input-box"
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
                            className="input-box"
                            placeholder="Enter stream"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="course">Enter course</label>
                        <input
                            onChange={handleinput}
                            value={formData.course}
                            type="text"
                            id="course"
                            className="input-box"
                            placeholder="Enter course"
                        />
                    </div>

                    <div className="form-group z-range-group">
                        <label>Enter Z-range</label>
                        <div className="z-range-inputs">
                            <input
                                onChange={handleinput}
                                type="text"
                                value={formData.zValue1}
                                id="zValue1"
                                className="z-range-box"
                                placeholder="Z-Value 1"
                            />
                            <input
                                onChange={handleinput}
                                type="text"
                                value={formData.zValue2}
                                id="zValue2"
                                className="z-range-box"
                                placeholder="Z-Value 2"
                            />
                        </div>
                    </div>
                    <div className='outerbox2'>
                    <div className="box3">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Dentries;
