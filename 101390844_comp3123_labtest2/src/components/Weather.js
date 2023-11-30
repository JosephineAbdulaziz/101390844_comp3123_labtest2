import React, { useState, useEffect , Dimensions} from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [day, setChosenDay] = useState('');
  const [chosenDayData, setChosenDayData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.openweathermap.org/data/2.5/forecast?q=Toronto&cnt=64&units=metric&appid=98f3d54d74d6bb2617b2cd10e1cb9015'
      )
      .then((res) => {
        console.log(res.data);
        const currentWeather = res.data;
        setWeatherData(currentWeather);
        setChosenDayData(currentWeather.list); // Set initial data to display all days

      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []); 

  const getDayOfWeek = (timestamp) => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp * 1000);
    return weekDays[date.getDay()];
  };

  const handleSelectedDay = (e) => {
    const selectedDay = e.target.value;
    setChosenDay(selectedDay);


    const filtered = weatherData.list.filter((item) => getDayOfWeek(item.dt) === selectedDay);
    setChosenDayData(filtered);
  };

  const getWeatherIcon = (weather) => {
    let iconUrl = `https://openweathermap.org/img/wn/${weather}.png`;


    return iconUrl;
  };
  


  



  return (
    <div>
      <h1>Weather for Toronto</h1>
      <select value={day} onChange={handleSelectedDay}>
        <option value="">Select a day</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

    <div >
    {chosenDayData.map((item, index) => {
      if (index === 0 && getDayOfWeek(item.dt) === day) {
        return (
          <div key={index}style={{ border: '1px solid black', padding: '30px', margin: '10px 0',  backgroundColor: '#fcecb1', display: 'flex' , flexDirection: 'row', justifyContent: 'space-between', borderRadius: 25 }}>
            <div style={{}} >

        
            <h1><h2>{day}</h2> <b> {item.main.temp}°C</b></h1>
            <p>Feels like: <b>{item.main.feels_like}°C</b></p>
            <p>Min Temp: <b>{item.main.temp_min}°C</b></p>
            <p>Max Temp: <b>{item.main.temp_max}°C</b></p>
            <p>Weather: <b>{item.weather[0].main}</b></p>
            <p>Wind Speed: <b>{item.wind.speed} m/s</b></p>
            <p>Humidity: <b>{item.main.humidity}%</b></p>
            <p> <b>{new Date(item.dt * 1000).toLocaleDateString()}  At {new Date(item.dt * 1000).toLocaleTimeString()}</b></p>
            </div>
            <img  style={{width: 250,height:250 , marginTop:50 , justifyContent: 'flex-end'}} src={getWeatherIcon(item.weather[0].icon)} />

          </div>
        );
      }
    })}
  </div>
  <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0',  borderRadius: 25 }}>

    {chosenDayData.map((item, index) => {
      if (index !== 0 && getDayOfWeek(item.dt) === day) {
        return (
  
          <div key={index} style={{ padding: '4px', margin: '4px 0', width: '25%', backgroundColor: '#fcf2cc', justifyContent: 'center', }}>
          <p> {item.main.temp}°C</p>
          <img  style={{width: 100,height:100 , justifyContent: 'center'}} src={getWeatherIcon(item.weather[0].icon)}  />
        <p> {new Date(item.dt * 1000).toLocaleTimeString()}</p>
          </div>

        );
      }
      return null;
    })}
  </div>



    </div>
  );
};

export default Weather;
