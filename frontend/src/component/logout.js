import {useEffect, useState} from "react"
import axios from "axios";

export const Logout = () => {   
    
    useEffect(() => {       
        (async () => {         
            try {
                
                const {data} = await axios.post( 
                    'http://localhost:8000/logout/',
                    { refresh_token: localStorage.getItem('refresh_token') },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                
                localStorage.clear(); // Clear the localstorage for the access & refresh token so that the user is logged out.
                axios.defaults.headers.common['Authorization'] = null; // Remove the authorization header from axios so that the user is logged out.
                window.location.href = '/login' //  Redirect to the login page.
            } catch (e) {
                console.log(localStorage.getItem('data'))
                console.log('logout not working', e);
                
            }
        })();
    }, []);
    return (
        
        <div></div>
    )
}