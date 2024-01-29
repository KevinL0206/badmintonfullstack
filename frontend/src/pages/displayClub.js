import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


export const DisplayClub = () => {
    const [sessions,setSessions] = useState([]);
    const { username, clubName } = useParams(); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){ // Check if the user is authenticated or not. if not redirect to login page.                      
            window.location.href = '/login'
        }
        const fetchSessionData = async () => {
            const {data} = await axios.get(   // Create the GET request to the backend API.
                `http://127.0.0.1:8000/api/display-create-session/${username}/${clubName}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );
            setSessions(data);
            }
        fetchSessionData();
    } , []);

    const createSession = async () => {
        
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/display-create-session/${username}/${clubName}/`, {
                body: JSON.stringify({
                    'clubName': clubName,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );
            if (response.status === 201) {
                console.log(response);
                window.location.reload();
            } else if (response.response.status === 400){
                console.log(response.response.data.detail);
                setError(response.response.data.detail);
            }
        } catch (e) {
            console.log(e);
            setError("Invalid Request")
        }
    }

    
    return(
        <div>
            <h1>Club: {clubName}</h1>
            <h3>Sessions:</h3>
            {sessions.map((session, index) => { {/* Maps through the sessions and displays them */}
                const date = new Date(session.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // 0 indicates the first month of the year)
                const day = date.getDate();
                
                return (
                    <p key={index}> {/* Displays Users Clubs as navigation buttons to them */}
                        <Link to={`${username}/${clubName}/${year}/${month}/${day}`}>{session.date}</Link> 
                    </p>
                );
            })}

            <button onClick={createSession}>Create Session</button>
            {error && <p>Error: {error}</p>} {/* Display the error message if there is one */}
        </div>
    )
}