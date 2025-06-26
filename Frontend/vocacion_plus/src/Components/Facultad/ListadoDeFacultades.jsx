import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import FacultadCard from './FacultadCard';
import Bar from '../Bar/Bar'; // Importa el componente Bar para mostrar la barra de navegación

const ListadoDeFacultades = ({ onSelectFacultad }) => {
  const [facultadesList, setFacultadesList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [errorList, setErrorList] = useState(null);

  useEffect(() => {
    const fetchFacultadesIds = async () => {
      try {
        const dummyData = [
          { id: 'ing_sistemas', nombre: 'Facultad de Ingeniería de Sistemas' },
          { id: 'cien_exactas', nombre: 'Facultad de Ciencias Exactas y Naturales' },
          { id: 'artes_diseno', nombre: 'Facultad de Artes y Diseño' },
          { id: 'medicina', nombre: 'Facultad de Ciencias Médicas' },
          { id: 'derecho', nombre: 'Facultad de Derecho y Ciencias Sociales' },
          { id: 'economia', nombre: 'Facultad de Ciencias Económicas' },
        ];
        setTimeout(() => {
          setFacultadesList(dummyData);
          setLoadingList(false);
        }, 800);
      } catch (err) {
        setErrorList('No se pudo cargar el listado de facultades.');
        setLoadingList(false);
        console.error('Error al cargar listado de facultades:', err);
      }
    };
    fetchFacultadesIds();
  }, []);

  if (loadingList) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Cargando listado...</Typography>
      </Box>
    );
  }
  if (errorList) {
    return <Alert severity="error">{errorList}</Alert>;
  }
  return (
    <>
    <Bar></Bar>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Listado de Facultades
      </Typography>
      <FacultadCard
        facultades={facultadesList.map(f => ({
          ...f,
          descripcion: 'Descripción breve de la facultad.',
          ubicacion: 'Ubicación genérica',
          carreras: [
            { id: '1', nombre: 'Carrera 1' },
            { id: '2', nombre: 'Carrera 2' }
          ],
          imagen: `https://via.placeholder.com/600x200?text=${f.id.toUpperCase()}_FACULTAD`
        }))}
        onGoBack={() => {}}
        onSelectFacultad={onSelectFacultad}
      />
    </>
  );
};

export default ListadoDeFacultades;
