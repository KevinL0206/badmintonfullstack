import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


export const DisplayMatch = () => {
    const [match,setMatch] = useState([]);
    const { username, clubName,year,month,day,matchid } = useParams();
    const [score, setScore] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){ // Check if the user is authenticated or not. if not redirect to login page.                      
            window.location.href = '/login'
        }
        const fetchMatchData = async () => {
            try {
                const {data} = await axios.get(   // Create the GET request to the backend API.
                    `http://127.0.0.1:8000/api/fetch-match/${username}/${clubName}/${year}/${month}/${day}/${matchid}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }}
                );
                setMatch(data);
                console.log(data);

            } catch (error) {
                console.error('Failed to fetch session data:', error);
            }
        }
        fetchMatchData();
    }, []);

    const handleChange = (event) => setScore(event.target.value);

    const handleSubmit = async () => {
        console.log(score);
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/update-match/${username}/${clubName}/${year}/${month}/${day}/${matchid}/ `, 
                {
                "score": score,
                }, 
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );

            if (response.status === 200) {
                window.location.href = `/${username}/${clubName}/${year}/${month}/${day}`;
            } else if (response.response.status === 400){
                console.log(response.response.data.detail);
                setError(response.response.data.detail);
            }
        } catch (e) {
            console.log(e);
        }
    }


    return(
        <div>
            
            <div>
                <h3>Match Details</h3>
                {match.matchID && <p>Match ID: {match.matchID}</p>}
                {match.team1 && <p>Team 1: {match.team1.join(' and ')}</p>}
                {match.team2 && <p>Team 2: {match.team2.join(' and ')}</p>}
                {match.score && <p>Score: {match.score}</p>}
                {match.completed && <p>Status: {match.completed ? "Completed" :"In Progress"}</p>}
            </div>

            <div>
                <h3> Final Score: </h3>
                <input onChange={handleChange} type="text" placeholder="00-00" />
                <button onClick={handleSubmit}>Submit</button>
                {error && <p>Error: {error}</p>} 
            </div>

        </div>

    )

}