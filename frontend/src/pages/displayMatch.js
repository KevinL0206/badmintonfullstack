import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import MatchDetails from "../component/matchdetails";


export const DisplayMatch = () => {
    const [match,setMatch] = useState([]);
    const { username, clubName,year,month,day,matchid } = useParams();
    const [score, setScore] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
                console.log("data",data);

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

    if (loading) {
        return <div>Loading...</div>; // Display a loading message or a spinner
    }

    if (!match) {
        return <div>No match data available</div>; // Display a message if no match data is available
    }

    return(
        match && <MatchDetails matchID={match.matchID} score={match.score} team1={match.team1} team2={match.team2} status={match.completed} />
    )

}