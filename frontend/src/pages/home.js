// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
// Define the Login function.
export const Home = () => {     
    const [message, setMessage] = useState('');
    const [clubs, setClubs] = useState([]);
    const[clubName, setClubName] = useState(''); 
    
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
                    window.location.href = '/login'
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

    const handleClick = (clubname) => {
        window.location.href = `${localStorage.getItem('username')}/${clubname}`
    }

    const handleChange = (event) => setClubName(event.target.value);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/display-create-club/${localStorage.getItem('username')}/`,{
                "clubName": clubName,
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );
            window.location.reload();
        } catch (error) { 
            console.log("Failed to Create New Club",error);
        }
    }


    return( 

        <main className="flex-1">
            <section className="w-full h-full py-8 md:py-16 lg:py-32">
                <div className="container  px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-6xl">
                                Welcome to Badminton Fixtures
                            </h1>
                            <p className="mt-3 mx-auto max-w-[600px] text-gray-500 md:text-lg lg:text-base xl:text-lg dark:text-gray-400">
                                Manage Your Clubs With Ease.
                            </p>
                        </div>

                        <hr className="w-1/3 mx-auto " />

                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {clubs.map((club, index) => (
                                <button 
                                    onClick={() => handleClick(club.clubName)}
                                    key={index}
                                    className={`aspect-[2/1] ${index === clubs.length - 1 ? 'col-span-2 lg:col-span-1' : ''} overflow-hidden rounded-lg object-contain object-center text-center font-bold text-lg mx-4`}
                                >
                                    {club.clubName}
                                </button>
                            ))}
                        </div>
                        
                        <div className="mt-20 space-x-2">
                            
                            <span className="font-bold">Create New Club: </span>
                            
                            <span>
                                <input
                                    onChange={handleChange}
                                    className="border-2 border-gray-300 p-2 mb-4 rounded-md"
                                    placeholder="Enter New Club Name"
                                    type="text"
                                />
                                <button  onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                            </span>
                        </div>  
                    </div>
                </div>
            </section>
        </main>


    )
}