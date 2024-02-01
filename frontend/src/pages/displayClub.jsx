import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Component from "@/component/displaydetails";



export const DisplayClub = () => {
    const [sessions,setSessions] = useState([]);
    const { username, clubName } = useParams(); 
    const [error, setError] = useState(null);
    const [clubPlayers, setClubPlayers] = useState([]);
    const [playerName,setPlayerName] = useState('');


    useEffect(() => {
        if(localStorage.getItem('access_token') === null){ // Check if the user is authenticated or not. if not redirect to login page.                      
            window.location.href = '/login'
        }
        const fetchSessionData = async () => {
            try {
                const {data} = await axios.get(   // Create the GET request to the backend API.
                    `http://127.0.0.1:8000/api/display-create-session/${username}/${clubName}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }}
                );
                setSessions(data);
            } catch (error) {
                console.error('Failed to fetch session data:', error);
            }
        }
        fetchSessionData();
    }, [username, clubName]);

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

    useEffect(() => {
        const getClubPLayers = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/display-create-club-players/kevin/badders/`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }}
                );
                setClubPlayers(response.data);
                
                } catch (error) {
                    console.log('Failed to fetch CLub Players:',error);
                }
        }
        getClubPLayers();
    } ,[]);

    const handleChange = (event) => setPlayerName(event.target.value);
    const handleSubmit = async () => {
        console.log(playerName);
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/display-create-club-players/${username}/${clubName}/`,{
                    "playerName": playerName,
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );
            window.location.reload();
        } catch (error) {
            console.log('Failed to add player:',error);
        } 
    }

    return(
        <div>
            <Component />

            
        </div> 
    )
}