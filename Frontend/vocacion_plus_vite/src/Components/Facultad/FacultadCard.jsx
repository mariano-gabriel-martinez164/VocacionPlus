import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { jwtDecode } from "jwt-decode";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // Main icon for the faculty
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icon for location
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Icon for the back button
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Icon for careers
import '../../App.css';

// Este componente ahora recibe una lista de facultades y las muestra en cards
const FacultadCard = ({facultades, Eliminar }) => {
    const [openModal, setOpenModal] = useState(false);
    const [facultadSelect, setFacultadSelect] = useState(null);
    const handleOpenModal = (facultadId) => {
      setFacultadSelect(facultadId);
      setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);
    const handleConfirmEliminar = (facultadId) => {
    if (Eliminar && facultadSelect !== null) Eliminar(facultadSelect); 
      handleCloseModal();
    };
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;
    const rol = user?.role || null;

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
              src={`http://localhost:5073${facultad.imagen}`}
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                pb: 2,
                borderBottom: '2px solid var(--primaryColor-white)',
                width: '95%',
                mx: 'auto',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {facultad.abreviatura}
              </Typography>

              <Chip
                label={facultad.accesibilidad ? 'Pública' : 'Privada'}
                color={facultad.accesibilidad ? 'success' : 'warning'}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ color: '#bdbdbd', mt: 2 }}>
              {facultad.nombre}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#bdbdbd' }}>
              <LocationOnIcon sx={{ mr: 0.5, fontSize: 18, color: 'var(--primaryColor-white)' }} />
              <Typography variant="body2" component="span" sx={{ fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {facultad.localidad} , {facultad.provincia}
              </Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ color: '#bdbdbd', mt: 2 }}>
              Carreras Ofertadas
            </Typography>
            {facultad.carreras && facultad.carreras.length > 0 ? (
              <List dense sx={{ pl: 0,
                maxHeight: 60,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                width: '6px', // ancho
                height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent', // o mismo color que la card
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'var(--primaryColor-white)', // color del scroll
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#999', // color al pasar el mouse
                },
                }}>
                {facultad.carreras.map((carrera) => (
                  <ListItem key={carrera.id} sx={{ py: 0.2 }}>
                    <AccountBalanceIcon sx={{ mr: 1, fontSize: 18, color: 'var(--primaryColor-white)' }} />
                    <ListItemText primary={carrera.nombre} primaryTypographyProps={{ sx: { whiteSpace: 'nowrap', color: 'var(--color-texto)', overflow: 'hidden', textOverflow: 'ellipsis' } }} />
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
            {rol === "Admin" && (
              <>
              <Button
                component={Link}
                to={`/editar-facultad/${facultad.id}`}
                variant="contained"
                sx={{
                  backgroundColor: "#34a853", // verde
                  fontWeight: "bold",
                  borderRadius: 2,
                  textTransform: "none",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#57bb8a",
                    transform: "scale(1.05)",
                  },
                  mr: 1,
                }}
              startIcon={<EditIcon />}>
                Editar
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ea4335", // rojo
                  fontWeight: "bold",
                  borderRadius: 2,
                  textTransform: "none",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#ff6b6b",
                    transform: "scale(1.05)",
                  },
                }}
              startIcon={<DeleteIcon />}
              onClick={() => handleOpenModal(facultad.id)}>
                Eliminar
              </Button>
              <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogContent>
                <Typography>¿Estás seguro que querés eliminar la facultad "{facultad.nombre}"?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Cancelar</Button>
                <Button color="error" onClick={handleConfirmEliminar}>Eliminar</Button>
              </DialogActions>
            </Dialog>
              </>)}
               <Button
                component={Link}
                to={`/facultad/${facultad.id}`}
                variant="contained"
                sx={{
                  backgroundColor: 'var(--primaryColor-light)',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: 'var(--primaryColor-lighter)',
                    transform: 'scale(1.05)',
                  },
              }}
             startIcon={<InfoIcon />}>
              Detalles
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default FacultadCard;