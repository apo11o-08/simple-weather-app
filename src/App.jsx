import { useState, useEffect } from 'react'
import {fetchWeatherApi} from "openmeteo"
import './App.css'
import citiesData from './city_data.json';
const DEC_PLACES = 2;



function App() {
  const [temperature, setTemp] = useState(0);
  const [currentCity, setCurrentCity] = useState(citiesData.city_arr[0].name);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    const city = citiesData.city_arr.find(c => c.name === currentCity);
    const params = {
      latitude: city.LAT,
      longitude: city.LONG,
      hourly: "temperature_2m",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const hourly = response.hourly();

    const temps = hourly.variables(0).valuesArray();
    setTemp(temps[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, [currentCity]);


  return (
    <>
      <h1>Seth's Weather App</h1>
      <h2 className='city-name'>{currentCity}</h2>
      <h1 className='temp'>{loading ? "Loading..." : temperature.toFixed(DEC_PLACES) + "°C"}</h1>

      <div className='city-buttons'>
        {citiesData.city_arr.map((city) => (
          <button
            key={city.name}
            onClick={() => {
              setCurrentCity(city.name);  // update state
            }}
            className={city.name == currentCity ? 'active' : ""}
          >
            {city.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default App
