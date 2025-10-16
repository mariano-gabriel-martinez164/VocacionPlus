import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import PasswordField from '../FormRegister/password';
import "../FormRegister/form.css"; // usamos los mismos estilos que RegisterForm

export default function LoginForm({ onSubmit }) {
  const [correo, setCorreo] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSubmit) { 
      onSubmit({ correo, password }); 
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className='register-form' 
      sx={{ gap: 1, p: 2, maxWidth: 360, maxHeight: 380 }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: 'var(--color-texto)' }}>
        Iniciar sesión
      </Typography>

      <TextField
        required
        label="Correo"
        type="email"
        variant="filled"
        value={correo}
        onChange={e => setCorreo(e.target.value)}
      />
      <PasswordField
            label="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />

      <Typography variant="body2" sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: 'var(--primaryColor-white)', textDecoration: 'underline' }}>
          Registrarse
        </Link>
      </Typography>

      <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto', marginBottom: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  )
}
