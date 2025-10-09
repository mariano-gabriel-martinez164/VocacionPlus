import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

// Paleta de colores
const colors = {
    background: '#1a0f0f',
    primary: '#e63946',
    secondary: '#a8dadc',
    textPrimary: '#ffffff',
    surface: '#2c3e50',
};

// TextField personalizado para mantener el estilo
const StyledTextField = (props) => (
    <TextField
        variant="outlined"
        fullWidth
        InputLabelProps={{
            style: { color: colors.secondary },
        }}
        sx={{
            marginBottom: '1.5rem',
            '& .MuiOutlinedInput-root': {
                '& .MuiInputBase-input': {
                    color: colors.textPrimary,
                },
                '& fieldset': {
                    borderColor: colors.secondary,
                },
                '&:hover fieldset': {
                    borderColor: colors.textPrimary,
                },
                '&.Mui-focused fieldset': {
                    borderColor: colors.primary,
                },
            },
        }}
        {...props}
    />
);

const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí iría la lógica para enviar el email o guardar el mensaje
        console.log({ nombre, email, mensaje });
        alert('¡Mensaje enviado con éxito!');
        // Limpiar formulario
        setNombre('');
        setEmail('');
        setMensaje('');
    };

    return (
        <Box sx={{ backgroundColor: colors.background, minHeight: '100vh', py: 5, color: colors.textPrimary }}>
            <Container maxWidth="md">
                <Typography variant="h3" component="h1" sx={{ color: colors.secondary, mb: 4, fontWeight: 'bold' }}>
                    Contacto
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    ¿Tienes alguna pregunta o sugerencia? Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <StyledTextField
                        label="Tu Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <StyledTextField
                        label="Tu Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <StyledTextField
                        label="Mensaje"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        multiline
                        rows={6}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: colors.primary,
                            '&:hover': { backgroundColor: '#c0392b' },
                            fontWeight: 'bold',
                            width: '100%',
                            py: 1.5
                        }}
                    >
                        Enviar Mensaje
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Contacto;