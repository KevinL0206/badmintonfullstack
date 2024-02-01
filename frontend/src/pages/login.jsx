// Import the react JS packages 
import axios from "axios";
import {useState} from "react";// Define the Login function.
import Nav from 'react-bootstrap/Nav';

export const Login = () => {     
    const [username, setUsername] = useState('');     
    const [password, setPassword] = useState('');     
    // Create the submit method.
    const submit = async e => {          
        e.preventDefault();           
        const user = { // Create the user object.
                username: username,
                password: password
            };

        // Create the POST request
        const {data} = await axios.post('http://localhost:8000/token/', user, { 
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });

        console.log(data)
        // Initialize the access & refresh token in localstorage.      
        localStorage.clear();         
        localStorage.setItem('access_token', data.access);         
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('username', username);         
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;    // Set the authorization header for the axios requests. 
        console.log("redirecting")    
        window.location.href = '/'; // Redirect to the home page.
    }
    return(      
    <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>

                <div className="form-group mt-3">
                    <label>Username</label>
                    <input className="form-control mt-1" 
                        placeholder="Enter Username" 
                        name='username'  
                        type='text' 
                        value={username}
                        required 
                        onChange={e => setUsername(e.target.value)}/>
                </div>

                <div className="form-group mt-3">
                    <label>Password</label>
                    <input 
                        name='password' 
                        type="password"     
                        className="form-control mt-1"
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className="d-grid gap-2 mt-3">
                    <button type="submit" 
                        className="btn btn-primary">Submit</button>
                </div>

                <nav>
                    <Nav.Link href="/register">Register</Nav.Link>
                </nav>
                
            </div>
        </form>
    </div>
    )
}
