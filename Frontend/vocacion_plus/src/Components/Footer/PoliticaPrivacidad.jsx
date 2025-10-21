import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';

// Paleta de colores
const colors = {
    background: '#1a0f0f',
    primary: '#e63946',
    secondary: '#a8dadc',
    textPrimary: '#ffffff',
};

const PoliticaPrivacidad = () => {
    return (
        <Box sx={{ backgroundColor: colors.background, minHeight: '100vh', py: 5, color: colors.textPrimary }}>
            <Container maxWidth="md">
                <Typography variant="h3" component="h1" sx={{ color: colors.secondary, mb: 2, fontWeight: 'bold' }}>
                    Política de Privacidad
                </Typography>
                <Typography variant="caption" sx={{ color: '#ccc' }}>
                    Última actualización: 7 de Octubre, 2025
                </Typography>
                
                <Divider sx={{ my: 4, borderColor: colors.secondary }} />

                <Typography variant="h5" sx={{ color: colors.secondary, mt: 4, mb: 2 }}>
                    1. Información que recopilamos
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, te suscribes a nuestro boletín o te comunicas con nosotros. Esta información puede incluir tu nombre, dirección de correo electrónico y cualquier otro dato que elijas proporcionar.
                </Typography>

                <Typography variant="h5" sx={{ color: colors.secondary, mt: 4, mb: 2 }}>
                    2. Uso de la información
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    Utilizamos la información que recopilamos para operar, mantener y mejorar nuestros servicios, para comunicarnos contigo, para procesar transacciones y para otros fines de servicio al cliente. No compartiremos tu información personal con terceros sin tu consentimiento, excepto en las circunstancias descritas en esta política.
                </Typography>
                
                {/* Agrega más secciones según sea necesario */}
            </Container>
        </Box>
    );
};

export default PoliticaPrivacidad;
