import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


export const DisplayClub = () => {
    const [sessions,setSessions] = useState([]);
    const { username, clubName } = useParams(); 

    useEffect(() => {
        const fetchSessionData = async () => {
            const {data} = await axios.get(   // Create the GET request to the backend API.
                `http://127.0.0.1:8000/api/display-create-session/${username}/${clubName}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
                }}
            );
            setSessions(data);
            }
        fetchSessionData();
    } , []);


    return(
        <div>
            <h1>Club: {clubName}</h1>
            <h3>Sessions:</h3>
            {sessions.map((session, index) => (
                <p key={index}> {/* Displays Users Clubs as navigation buttons to them */}
                    {session.date}
                </p>
            ))}
        </div>
    )
}