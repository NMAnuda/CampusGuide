import { useLocation } from 'react-router-dom'; 
import './find.css';
import React, { useEffect, useState } from "react";
import Axios from "axios";

function Find() {  

    const [data, setUserList] = useState([]);
    const location = useLocation();

    const getuser = async () => {
        try {
            const response = await Axios.get("http://localhost:3002/getdetails");
            setUserList(response.data.users);
            return response.data.users;
        } catch (error) {
            console.error("fetching error", error);
        }
    };

    useEffect(() => {
        getuser();
    }, [location]);

    return ( 

        <div className='kj'> 
           
        <div className='tablebox'>
            <table border="1" className='as'>
                <thead>
                    <tr>
                        <th>District</th>
                        <th>Stream</th>
                        <th>Course</th>
                        <th>Z-Range</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.district}</td>
                            <td>{row.stream}</td>
                            <td>{row.course}</td>
                            <td>{row.zValue1} - {row.zValue2}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default Find;  
