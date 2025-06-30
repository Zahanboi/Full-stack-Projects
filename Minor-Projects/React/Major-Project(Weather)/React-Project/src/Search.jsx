import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import APIcall from "./API.jsx"
import './DisplayCard.css';
import './App.css';
import { FormHelperText } from '@mui/material';

export default function searchButton() {
    let [city, setCity] = useState('');

    function handleEvent(event) {
        setCity(event.target.value); 
    }

    function handleMain(event) {  
        event.preventDefault(); 
        setCity('');
    }
const [submittedCity, setSubmittedCity] = useState('');

function rotatecard() {
    var card = document.querySelector('.card');
    console.log("hii");
    card.classList.add('is-flipped');
    
    setTimeout(() => {
        card.classList.remove('is-flipped');
    }, 1000);
}

function handleMain(event) {  
    event.preventDefault(); 
    setSubmittedCity(city);// alaways use another useState for passing a set value
    setCity('');
    if (city.trim() != '') {
        rotatecard();
    }
}

return (
    <>
    <div className='header'>
        <h1>Weather Search by City</h1>
        <form onSubmit={handleMain}>
        <TextField id="filled-basic" 
        label="Search here" 
        variant="filled"
        onChange={handleEvent} 
        value={city}
        />
            <br /><br />
            <Button sx={{ maxWidth: 345, background: "none" ,backdropFilter: "blur(20px)"}} variant="contained" type='submit' className='btn'>Search</Button>
        </form>
        <div>
            <p style={{color:'black'}}>__________________________________________________________________________</p>
        </div>
    </div>
        <APIcall city={submittedCity}></APIcall>
    </>
)
}