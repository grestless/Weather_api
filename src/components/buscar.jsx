import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function Buscar({ city, setCity, onSubmit, error, loading }) {
  return (
    <Box
      sx={{display: "grid", gap: 2, padding:2.5}}
      component="form"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField
        id="city"
        label="Ciudad"
        variant="outlined"
        size="small"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={error.error}
        helperText={error.message}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        loading={loading}
        loadingIndicator="Buscando..."
        sx={{
          backgroundColor: '#155E63', // Color de fondo del botón
          '&:hover': {
            backgroundColor: '#76B39D', // Color de fondo al pasar el mouse
          },
        }}
      >
        Buscar
      </LoadingButton>
    </Box>
  );
}
