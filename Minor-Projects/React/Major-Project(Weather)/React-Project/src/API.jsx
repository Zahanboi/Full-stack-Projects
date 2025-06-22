import { useEffect } from 'react';
import { useState } from 'react';
import DisplayCard from "./DisplayCard.jsx";

export default function API({ city }) {
  let URL = "https://api.openweathermap.org/data/2.5/weather?";
  let API_KEY = "5f379b3009bb953135e022dbeab29120";

  let [weatherInfo, setWeatherInfo] = useState({});
  let Response = async () => {
    if (city === '') {
      return null; // as on first reload no data can also pass a example city in useState
    }
try {
  let res = await fetch(`${URL}q=${city}&appid=${API_KEY}&units=metric`);
  let jsonres = await res.json();
    
    let Weather = {
        city: jsonres.name,
        country: jsonres.sys.country,
        temp: jsonres.main.temp,
        temp_min: jsonres.main.temp_min,
        temp_max: jsonres.main.temp_max,
        description: jsonres.weather[0].description,
        // Error: null
    };
    console.log(Weather);
    setWeatherInfo(Weather);
} catch (error) {
  setWeatherInfo({
    Error : `City not found!!`
  })
}
    
  };

  useEffect(() => { 
    Response();
  }, [city]);

  return <DisplayCard info={weatherInfo}></DisplayCard>;
}