import { useState, useEffect } from "react";
import axios from "axios";

export const FetchAddPlayers = (props) => {
    const [sessionAddPlayer, setSessionAddPlayer] = useState([]); 
    const [hide, setHide] = useState(true);
    const [checkedPlayers, setCheckedPlayers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    `http://127.0.0.1:8000/api/add-player-to-session/${props.username}/${props.clubName}/${props.year}/${props.month}/${props.day}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }}
                );
                setSessionAddPlayer(data);
            } catch (error) {
                console.error('Failed to fetch Session Details:', error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (playerName) => {
        setCheckedPlayers(prevState => ({ //prevstate is the current state of checkedPlayers
            ...prevState, // keep all other key-value pairs
            [playerName]: !prevState[playerName]  // add or update the value of specific key
        }));
    };

    const handleSubmit = async () => {
        const selectedPlayers = Object.keys(checkedPlayers).filter(playerName => checkedPlayers[playerName]); // returns an array of selected players

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/add-player-to-session/${props.username}/${props.clubName}/${props.year}/${props.month}/${props.day}/`, {
                "players": selectedPlayers,
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }}
            );
            window.location.reload();
        } catch (error) {
            console.error('Failed to Add Players:', error);
        }

        
    };
    
    return (
        <div>
            <button onClick={() => setHide(!hide)}>Add Players</button>
            {!hide && sessionAddPlayer.map((player, index) => (
                
                    <div key={index}>
                        <h5>Player: {player.playerName}</h5>
                        <input 
                            type="checkbox" 
                            id={`playerCheckbox-${index}`} 
                            checked={checkedPlayers[player.playerName] || false}
                            onChange={() => handleCheckboxChange(player.playerName)}
                        />
                        <label htmlFor={`playerCheckbox-${index}`}>Select</label>

                    </div>

            ))}
            
            {!hide && <button onClick={handleSubmit}>Submit</button>}
            
            
        </div>
    );
}