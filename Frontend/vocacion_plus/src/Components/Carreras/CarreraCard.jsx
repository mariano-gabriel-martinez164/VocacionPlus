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
  Rating,
  styled,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // Main icon for the faculty
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icon for location
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Icon for the back button
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Icon for careers
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Navigate, useNavigate } from 'react-router-dom';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary-300)',
  },
  '& .MuiRating-iconHover': {
    color: 'var(--primary-100)',
  },
});

// Este componente ahora recibe una lista de facultades y las muestra en cards
const CarreraCard = ({ carrera, index }) => {
  const [valoracion, setValoracion] = React.useState(2);

  const navigate = useNavigate();
  const NavCarreraDetails = () => {
    navigate(`/carrera/${encodeURIComponent(carrera.nombre)}`);
  };
  return (
    <Card
      onClick={NavCarreraDetails}
      key={index}
      sx={{
        backgroundColor: 'var(--primary-500)',
        color: 'var(--black)',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden', // Evita que el contenido se desborde
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden', p: 2 }}>
        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {carrera.nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: '#e0e0e0', lineHeight: 1.5, maxHeight: 56, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {carrera.descripcion}
        </Typography>
      </CardContent>
      <StyledRating
        name='valoracion'
        precision={0.2}
        icon={<MenuBookIcon fontSize="large" />}
        emptyIcon={<MenuBookIcon fontSize="large" />}
        value={valoracion}
        readOnly
        sx={{
          p: 2
        }}
      />
    </Card>
  );
};

export default CarreraCard;
