// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
// Define the Login function.
export const Home = () => {     
    const [message, setMessage] = useState('');
    const [clubs, setClubs] = useState([]);
    
    useEffect(() => {        
        if(localStorage.getItem('access_token') === null){ // Check if the user is authenticated or not. if not redirect to login page.                      
            window.location.href = '/login'
        }
        else{ // If the user is authenticated, then get the message from the backend API.
            (async () => {           
                try {             
                    const {data} = await axios.get(   // Create the GET request to the backend API.
                            'http://localhost:8000/home/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
                            }}
                        );            
                    setMessage(data.message);          
                } catch (e) {            
                    console.log('not authenticated') 
                }         
                })()};     
    }, []);

    useEffect(() => {
        const fetchClubData = async () => {
            const {data} = await axios.get(   // Create the GET request to the backend API.
                `http://127.0.0.1:8000/api/display-create-club/${localStorage.getItem('username')}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
                }}
            );            
            setClubs(data);
        }
        fetchClubData();
    }, []);


    return(         
        <div className="form-signin mt-5 text-center">
        <h3>Hi {localStorage.getItem('username')} </h3>
        <h4>{message}</h4>

        <h3>Your Clubs</h3>
        {clubs?.map((club, index) => (
            <p key={index}> {/* Displays Users Clubs as navigation buttons to them */}
                <Link to={`${localStorage.getItem('username')}/${club.clubName}`}>{club.clubName}</Link> 
            </p>
        ))}

        </div>
        
    )
}