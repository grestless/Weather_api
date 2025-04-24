import { Container, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import fondo from './img/fondo.jpg';
import Buscar from './components/buscar.jsx';
import ClimaInfo from './components/climaInfo.jsx';

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`;

export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setLoading(true);
  
    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };
  
      const res = await fetch(API_WEATHER + city);
      const data = await res.json();
  
      console.log(data); // Agrega esta línea para verificar la respuesta
  
      if (data.error) {
        throw { message: data.error.message };
      }
  
      const weatherData = {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      };
  
      setWeather(weatherData);
  
      await axios.post('http://localhost:3000/api/search', weatherData);
    } catch (error) {
      console.log(error);
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
        padding: 2,
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: 2,
      }}
      component="main"
      elevation={3}
    >
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{color: '#f4f4f4'}}>
        Weather App
      </Typography>
      <Buscar
        city={city}
        setCity={setCity}
        onSubmit={onSubmit}
        error={error}
        loading={loading}
      />
      {weather.city && <ClimaInfo weather={weather} />}

      <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
        Powered by:{" "}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
}
