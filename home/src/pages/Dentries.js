import React, { useState } from 'react';
import './dentries.css';
import Axios from "axios";
import { Link } from 'react-router-dom';

function Dentries() {
    const [formData, setFormData] = useState({
        district: '',
        stream: '',
        subject1: '',
        subject2: '',
        subject3: '',
        course: '',
        zValue1: '',
        zValue2: '',
        campus: '',
        year: '',
        Students: ''
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
            ...formData 
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
            <div className="form-container">
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
                        <label htmlFor="subject1">Enter Subject 1</label>
                        <input
                            onChange={handleinput}
                            value={formData.subject1}
                            type="text"
                            id="subject1"
                            className="input-box"
                            placeholder="Enter subject 1"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject2">Enter Subject 2</label>
                        <input
                            onChange={handleinput}
                            value={formData.subject2}
                            type="text"
                            id="subject2"
                            className="input-box"
                            placeholder="Enter subject 2"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject3">Enter Subject 3</label>
                        <input
                            onChange={handleinput}
                            value={formData.subject3}
                            type="text"
                            id="subject3"
                            className="input-box"
                            placeholder="Enter subject 3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="course">Enter Course</label>
                        <input
                            onChange={handleinput}
                            value={formData.course}
                            type="text"
                            id="course"
                            className="input-box"
                            placeholder="Enter course"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="campus">Enter Campus</label>
                        <input
                            onChange={handleinput}
                            value={formData.campus}
                            type="text"
                            id="campus"
                            className="input-box"
                            placeholder="Enter campus"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Enter Year</label>
                        <input
                            onChange={handleinput}
                            value={formData.year}
                            type="text"
                            id="year"
                            className="input-box"
                            placeholder="Enter year"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="students">Enter Number of Students</label>
                        <input
                            onChange={handleinput}
                            value={formData.students}
                            type="number"
                            id="students"
                            className="input-box"
                            placeholder="Enter number of students"
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

<button type="submit" className="submit-button">Submit</button>


                </form>
            </div>
        </div>
    );
}

export default Dentries;
