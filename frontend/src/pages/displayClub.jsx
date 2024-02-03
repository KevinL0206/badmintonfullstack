import {useEffect, useState,} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Component from "@/component/displaydetails";



export const DisplayClub = () => {
    const [sessions,setSessions] = useState([]);
    const { username, clubName } = useParams(); 

    const [clubPlayers, setClubPlayers] = useState([]);
    


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


    useEffect(() => {
        const getClubPLayers = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/display-create-club-players/${username}/${clubName}/`, {
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

    let sortedPlayers = clubPlayers && [...clubPlayers].sort((a, b) => a.playerName.localeCompare(b.playerName));

    return(
        <div>
            <Component username={username} clubName= {clubName} sessions = {sessions} clubPlayers={sortedPlayers} />
        </div> 
    )
}