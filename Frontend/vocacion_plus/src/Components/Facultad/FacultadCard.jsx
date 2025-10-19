import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // Main icon for the faculty
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icon for location
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Icon for the back button
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Icon for careers

// Este componente ahora recibe una lista de facultades y las muestra en cards
const FacultadCard = ({facultades}) => {
  // Si no hay facultades, muestra un mensaje
  if (!facultades || facultades.length === 0) {
    return (
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#202124',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          maxWidth: 800,
          width: '100%',
          margin: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>No se encontraron facultades.</Typography>
      </Box>
    );
  }

  // Renderiza las cards en un Grid/Flex
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 3,
        minHeight: '80vh',
      }}
    >
      {facultades.map((facultad) => (
        <Card
          key={facultad.id}
          sx={{
            width: 340,
            height: 440,
            backgroundColor: '#202124',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // Evita que el contenido se desborde
          }}
        >
          {facultad.imagen && (
            <img
              src={facultad.imagen}
              alt={`Imagen de ${facultad.nombre}`}
              style={{
                width: '100%',
                height: 120,
                objectFit: 'cover',
                borderRadius: '4px 4px 0 0',
                marginBottom: '8px'
              }}
            />
          )}
          <CardContent sx={{ flexGrow: 1, overflow: 'hidden', p: 2 }}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {facultad.nombre}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#bdbdbd' }}>
              <LocationOnIcon sx={{ mr: 0.5, fontSize: 18, color: '#8ab4f8' }} />
              <Typography variant="body2" component="span" sx={{ fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {facultad.direccion}
              </Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ color: '#bdbdbd', mt: 2 }}>
              Carreras Ofertadas
            </Typography>
            {facultad.carreras && facultad.carreras.length > 0 ? (
              <List dense sx={{ pl: 0, maxHeight: 60, overflow: 'auto' }}>
                {facultad.carreras.map((carrera) => (
                  <ListItem key={carrera.id} sx={{ py: 0.2 }}>
                    <AccountBalanceIcon sx={{ mr: 1, fontSize: 18, color: '#8ab4f8' }} />
                    <ListItemText primary={carrera.nombre} primaryTypographyProps={{ sx: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                No hay carreras registradas.
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 2, borderTop: '1px solid #333' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#8ab4f8',
                color: '#202124',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#a8c7fa',
                },
              }}
            >
              Detalles
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default FacultadCard;