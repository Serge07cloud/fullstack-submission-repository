import { useState, useEffect } from "react"
import openweathermap from "../services/openweathermap"

function Weather ({ country })
{
  const [weather, setWeather] = useState(null)
  const baseIconUrl = `https://openweathermap.org/img/wn`
  useEffect(() =>
  {
    openweathermap.getWeather(country).then((response) => setWeather(response))
  }, [])
  if (!weather) return <p>Loading weather data...</p>
  return <>
    <h1>{ `Weather in ${country}` }</h1>
    <p>{ `Temperature ${weather.main.temp} Celsius` }</p>
    <img src={ `${baseIconUrl}/${weather.weather[0].icon}@2x.png` } alt={ weather.description } />
    <p>{ `Wind ${weather.wind.speed} m/s` }</p>
  </>
}

export default Weather
