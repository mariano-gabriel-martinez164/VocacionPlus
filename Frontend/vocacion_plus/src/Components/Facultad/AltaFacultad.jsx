import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Bar from '../Bar/Bar';
function AltaFacultad() {
    const [accesibilidad, setAccesibilidad] = React.useState('');
  React.useEffect(() => {
    document.body.style.backgroundColor = '#1A1A1A';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
      <React.Fragment>
        <Bar/>
        <h1 style={{color: '#BA2C39', marginTop:'5rem', marginBottom:'-0.5rem', marginLeft:'13rem', fontSize:'4rem'}}>Crear Facultad</h1>
      <CssBaseline />
      <Container fixed sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center',marginTop:'0rem', justifyContent: 'center' }}>
        <Box sx={{ bgcolor: '#381518', width: '100%', minHeight: '109vh', borderRadius: 2, boxShadow: 3, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{ backgroundColor:'#BA2C39', input: { color: '#fff' }, marginBottom:'2rem', marginTop:'2rem', label: { color: '#fff' }, borderRadius: 2, boxShadow: 3 }}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            sx={{ backgroundColor:'#BA2C39', input: { color: '#fff' }, marginBottom:'2rem', label: { color: '#fff' }, borderRadius: 2, boxShadow: 3 }}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{ backgroundColor:'#BA2C39', input: { color: '#fff' }, marginBottom:'2rem', label: { color: '#fff' }, borderRadius: 2, boxShadow: 3 }}
          />
          <FormControl fullWidth>
            <InputLabel id="accesibilidad-label" sx={{ color: '#fff' }}>Accesibilidad</InputLabel>
            <Select
              labelId="accesibilidad-label"
              id="accesibilidad"
              value={accesibilidad}
              label="Accesibilidad"
              onChange={e => setAccesibilidad(e.target.value)}
              sx={{backgroundColor:'#BA2C39', marginBottom:'2rem', color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }, borderRadius: 2, boxShadow: 3 }}
            >
              <MenuItem value="publica">Pública</MenuItem>
              <MenuItem value="privada">Privada</MenuItem>
            </Select>
          </FormControl>

            <TextField
            label="Acceso Directo"
            variant="outlined"
            fullWidth
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{ backgroundColor:'#BA2C39', input: { color: '#fff' }, marginBottom:'2rem', label: { color: '#fff' }, borderRadius: 2, boxShadow: 3 }}
          />
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            type="email"
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{ backgroundColor:'#BA2C39', input: { color: '#fff' }, marginBottom:'2rem', label: { color: '#fff' }, borderRadius: 2, boxShadow: 3 }}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ backgroundColor:'#BA2C39', height: '5rem', width:'10rem',color: '#fff', borderColor: '#BA2C39', marginBottom:'2rem', '&:hover': { borderColor: '#fff' }, borderRadius: 2, boxShadow: 3 }}
          >
            Subir Imagen
            <input type="file" hidden />
          </Button>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                backgroundColor: '#fff',
                color: '#BA2C39',
                borderColor: '#BA2C39',
                height: '5rem',
                width: '10rem',
                borderRadius: 2,
                fontWeight: 'bold',
                boxShadow: 3,
                mr: 2,
                '&:hover': { borderColor: '#BA2C39', backgroundColor: '#f5f5f5' }
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" sx={{ bgcolor: '#BA2C39', height: '5rem', width:'10rem',fontWeight: 'bold', borderRadius: 2, boxShadow: 3 }}>
              Crear
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default AltaFacultad