import { Box, Typography } from '@mui/material';

export default function ClimaInfo({ weather }) {
  return (
    <Box
    sx={{
      mt: 2, 
      display: "grid", 
      gap: 2, 
      textAlign: "center", 
      padding: 6, 
      borderRadius: 2, 
      backgroundColor: 'rgba(23,25,31,255)',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
    }}
    >
      <Typography variant="h4" component="h2" sx={{color: '#f4f4f4'}}>
        {weather.city}, {weather.country}
      </Typography>
      <Box
        component="img"
        alt={weather.conditionText}
        src={weather.icon}
        sx={{ margin: "0 auto", width: 80, height: 80 }}
      />
      <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" , fontSize: "1.8rem", color: '#f4f4f4'}}>
        {weather.temperature} °C
      </Typography>
      <Typography variant="h6" component="h4" sx={{color: '#f4f4f4'}}>
        {weather.conditionText}
      </Typography>
    </Box>
  );
}
