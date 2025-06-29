import { Link, useLocation } from 'react-router-dom'; 
import './All.css';
import React, { useEffect, useState } from "react";
import Axios from "axios";

function All() {
    const [data, setUserList] = useState([]);
   
    const location = useLocation();
    const getuser = async () => {
        try {
            const response = await Axios.get("http://localhost:3002/details");
            setUserList(response.data.users);
            return response.data.users;
        } catch (error) {
            console.error("fetching err", error);
        }
    };
    
    useEffect(() => {
        getuser();
    }, [location]);
    
    const handlDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this?");
        if (isConfirmed) {
            try {
                await Axios.delete(`http://localhost:3002/api/deleteuser/${id}`);
                console.log("User deleted");
                getuser(); 
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        } else {
            console.log("Delete operation canceled");
        }
    };

    return (
        <div className="app-container">
           
            <div className='hs'>
                <div className='tablebox1'>
                    <table border="1" className='asb'>
                        <thead>
                            <tr>
                                <th>District</th>
                                <th>Stream & Subjects</th>
                                <th>Course</th>
                                <th>Z-Range</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.district}</td>
                                    <td>
                                        <div>{row.stream}</div>
                                        <div>Subject 1: {row.subject1}</div>
                                        <div>Subject 2: {row.subject2}</div>
                                        <div>Subject 3: {row.subject3}</div>
                                    </td>
                                    <td>{row.course}</td>
                                    <td>{row.zValue1} - {row.zValue2}</td>
                                    <td>
                                        <button>Update</button>
                                        <button onClick={() => handlDelete(row._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default All;