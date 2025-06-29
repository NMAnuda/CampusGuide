import { useLocation } from 'react-router-dom'; 
import './find.css';
import React, { useEffect, useState } from "react";
import Axios from "axios";

function Find() {  
    const [data, setUserList] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const location = useLocation();

    const getuser = async (year) => {
        try {
            const response = await Axios.get("http://localhost:3002/getdetails", {
                params: { year: year }
            });
            setUserList(response.data.users);
        } catch (error) {
            console.error("fetching error", error);
        }
    };

    useEffect(() => {
        getuser(selectedYear);
    }, [location, selectedYear]);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    return ( 
        <div className="find-container">
            <div className="card">
                <h2 className="title">Course Selection Summary</h2>

                <div className="filter-group">
                    <label>Select Year: </label>
                    <select value={selectedYear} onChange={handleYearChange}>
                        <option value="">All</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>

                <div className="table-wrapper">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>District</th>
                                <th>Stream</th>
                                <th>Course</th>
                                <th>Campus</th> {/* New Column */}
                                <th>Z-Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.district}</td>
                                        <td>{row.stream}</td>
                                        <td>{row.course}</td>
                                        <td>{row.campus}</td> {/* Display Campus */}
                                        <td>{row.zValue1} - {row.zValue2}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-data">No data available for selected year.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Find;
