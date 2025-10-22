import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PasswordField from './password';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import "./form.css"

export default function RegisterForm({ onSubmit }) {
  const [errors, setErrors] = React.useState({});
  const [age, setAge] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
     let newErrors = {};
    
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    else if (nombre.length < 4 ) newErrors.nombre = "El nombre debe tener al menos 4 caracteres";

    if (!apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
    else if (apellido.length < 4 ) newErrors.apellido = "El apellido debe tener al menos 4 caracteres";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!correo.trim()) newErrors.correo = "El correo es obligatorio";
    else if (!emailRegex.test(correo)) newErrors.correo = "Correo formato no valido!";

    if(!password.trim()) newErrors.password = "La contraseña es obligatoria!";
    if(password.length < 6 ) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (password !== confirmPassword) newErrors.password = "las contraseñas no coinciden";

    const ageNumber = Number(age);
    if (ageNumber < 10 || ageNumber > 80){
      newErrors.age = "la edad debe estar entre 10 y 80 años";
    }

    setErrors(newErrors);

    if(Object.keys(newErrors).length > 0) return;

    if(onSubmit) { onSubmit({ nombre, apellido, correo, password, age: ageNumber }); }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        padding: 2,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'var(--backgroundColor-default)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '800px',           // ancho total del bloque
          maxWidth: '95%',
          borderRadius: 6,
          overflow: 'hidden',       // elimina cualquier línea entre imagen y form
          boxShadow: '0 0 15px rgba(0,0,0,0.4)',
          backgroundColor: 'var(--primaryColor-darker)',
        }}
      >
        <Box
          component="img"
          src="/vpb.jpg"
          alt="Imagen ilustrativa"
          sx={{ 
            height: '100%',
            flex: 1,  
            objectFit: 'cover',
            display: 'block',
            margin: -1,
          }}
        />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className='register-form'
          sx={{ gap: 1, p:3, flex:1, display: 'flex', flexDirection: 'column'}}
        >
          <Typography variant="h5" sx={{ mb: 2, color: 'var(--color-texto)' }}>
            Registrarse en VocacionPlus
          </Typography>

          <TextField
            required
            label="Nombre"
            value={nombre}
            variant="filled"
            type="text"
            error={!!errors.nombre}
            helperText={errors.nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <TextField
            required
            label="Apellido"
            value={apellido}
            variant="filled"
            type="text"
            error={!!errors.apellido}
            helperText={errors.apellido}
            onChange={e => setApellido(e.target.value)}
          />
          <TextField
            required
            label="Correo"
            type="email"
            variant="filled"
            value={correo}
            error={!!errors.correo}
            helperText={errors.correo}
            onChange={e => setCorreo(e.target.value)}
          />
          <PasswordField
            label="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <PasswordField
            label="Repetir contraseña"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            label="Edad"
            type="number"
            value={age}
            onChange={ e => setAge(e.target.value)}
            error={!!errors.age}
            helperText={errors.age}
            variant="filled"
          />
          <Typography variant="body2" sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{ color: 'var(--primaryColor-white)', textDecoration: 'underline' }}>
              Iniciar sesión
            </Link>
          </Typography>
          <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto', marginBottom: 3 }}>
            <Button
              type="submit" variant="contained" color="primary">
                Continuar 
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

