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

        sx={{
          backgroundColor: 'transparent', // Color de fondo del campo de texto
           '&:hover':
             { backgroundColor: 'rgba(23,25,31,255)' }, // Color de fondo del campo de texto
          borderRadius: '4px', // Bordes redondeados
          '& .MuiInputLabel-root': {
            color: '#ff5529', // Color del texto de la etiqueta
          },
          '& .MuiInputBase-input': {
            color: '#f4f4f4', // Color del texto ingresado
          },
          '& .MuiFormHelperText-root': {
            color: error.error ? '#d32f2f' : '#76B39D', // Color del texto de ayuda
          },
        }}

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
          backgroundColor: '#ea8845', // Color de fondo del botón
          '&:hover': {
            backgroundColor: 'transparent', // Color de fondo al pasar el mouse
          },
        }}
      >
        Buscar
      </LoadingButton>
    </Box>
  );
}
