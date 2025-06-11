import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import './DisplayCard.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { red } from '@mui/material/colors';

export default function DisplayCard({info}) {
    let [info1 , setInfo1] = useState({
        city: 'City',
        country: 'Country',
        temp: 'Temp',
        temp_min: 'Temp_min',
        temp_max: 'Temp_max',
        description: 'Description',
        // Error: null
    });

    useEffect(() => { 
        setInfo1(info);
      }, [info]); //As on reloading API is called by value '' so on reloading initial value changes to empty (null as written in API.jsx) so setting a initial value for info1 is pointless

    return (
      <>
      {info1.Error && <h3 id='alert'>{info1.Error}</h3>} {/* very imp technique */}
      
      <div className='card'>
        <br />
        <Card sx={{ maxWidth: 345, background: "none" }} className='card1' >
      <CardActionArea >
      <CardMedia
        component="img"
        height="150"
        image='top-img.jpeg'
        alt="green iguana"
        style={{opacity: '0.85'}}
        
      />
      <CardContent className='card2'>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily: 'r' , fontSize: '25px'}}>
         {info1.city === undefined ? '--' : info1.city }
        <hr />
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
        <div className='info'>
        Country Code: {info1.country}<br /> <br />
        Temperature: {info1.temp}°C<br /><br />
        Min Temperature: {info1.temp_min}°C<br /><br />
        Max Temperature: {info1.temp_max}°C<br /><br />
        Description: {info1.description}<br /><br />
        </div>
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
      </div>
      </>
    )
}