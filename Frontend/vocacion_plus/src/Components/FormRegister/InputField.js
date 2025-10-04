import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function RegisterForm() {
  const [age, setAge] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [password, SetPassword] = React.useState("");
  const [correo, setCorreo] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({nombre, correo, password, age});
    //falta la verificacion de la doble contrase;a
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
      id="nombre"
      label="Obligatorio"
      value={nombre}
      defaultValue="Nombre"
      variant="filled"
      type="text"
      onChange={e => setNombre(e.target.value)}
    />
    <TextField
      required
      id="correo"
      label="Obligatorio"
      defaultValue="Correo"
      type="email"
      variant="filled"
      value={correo}
      onChange={e = setCorreo(e.target.value)}
    />
   <TextField
      required
      id="password"
      label="Obligatorio"
      defaultValue="Contraseña"
      type="password"
      variant="filled"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
    {/* falta un campo para verificar la contra*/}
    <TextField
      label="Edad"
      type="number"
      value={age}
      onChange={ e => setAge(e.target.value)}
      variant="filled"
    />
    <Button
      type="submit" variant="contained" color="primary">
        Crear cuenta
     </Button>
    </Box>
  )
}
