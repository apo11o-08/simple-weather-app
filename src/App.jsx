import { useState, useEffect } from 'react'
import {fetchWeatherApi} from "openmeteo"
import './App.css'

const SYD_LAT = 2;
const SYD_LON = 30;
const DEC_PLACES = 2;

const coords = {
  "SYDNEY":
    {
      LONG: 151.2073,
      LAT: -33.8708,
    },
  "MELBOURNE":
    {
      LONG: 144.9623,
      LAT: -37.8124,
    },
  "ADELAIDE":
    {
      LONG: 138.6007,
      LAT: -34.9285,
    },
  "CAIRNS":
    {
      LONG: 145.7710,
      LAT: -16.9203
    },
}
const cities = ["SYDNEY", "MELBOURNE", "ADELAIDE", "CAIRNS"];

function App() {
  const [temperature, setTemp] = useState(0);
  const [currentCity, setCurrentCity] = useState(cities[0]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    const params = {
      latitude: coords[currentCity].LAT,
      longitude: coords[currentCity].LONG,
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
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => {
              setCurrentCity(city);  // update state
            }}
            className={city == currentCity ? 'active' : ""}
          >
            {city}
          </button>
        ))}
      </div>
    </>
  )
}

export default App
