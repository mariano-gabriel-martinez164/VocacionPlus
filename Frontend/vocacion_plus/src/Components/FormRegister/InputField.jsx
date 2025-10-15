import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PasswordField from './password'; 

export default function RegisterForm({ onSubmit }) {
  const [age, setAge] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [correo, setCorreo] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword){
      alert("Las contraseñas no coinciden");
      return;
    }
    const ageNumber = Number(age);
    if (ageNumber < 7 || ageNumber > 100){
      alert("la edad debe estar entre 7 y 100 años");
      return 
    }
    console.log({nombre, apellido, correo, password, age});
    if(onSubmit) { onSubmit({ nombre, apellido, correo, password, age: ageNumber }); }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        m: '0 auto',
        p: 2,
        '& .MuiTextField-root': {m: 1, width: '100%'} }}
      noValidate
      autoComplete="off"
    >
    <TextField
      required
      label="Nombre"
      value={nombre}
      variant="filled"
      type="text"
      onChange={e => setNombre(e.target.value)}
    />
    <TextField
      required
      label="Apellido"
      value={apellido}
      variant="filled"
      type="text"
      onChange={e => setApellido(e.target.value)}
    />
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
    <PasswordField
      label="Repetir contraseña"
      value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}
    />
    <TextField
      label="Edad"
      type="number"
      value={age}
      onChange={ e => setAge(e.target.value)}
      inputProps={{ min: 7, max: 100 }}
      variant="filled"
    />
    <Button
      type="submit" variant="contained" color="primary">
        Crear cuenta
     </Button>
    </Box>
  )
}
