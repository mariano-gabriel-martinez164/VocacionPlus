import React, { useState, useEffect } from 'react'; // Agregamos useEffect por si quieres cargar IDs dinámicamente
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress, // Para simular carga del listado de IDs
  Alert // Para mensajes de error si la carga de IDs falla
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Importamos el componente VerFacultades (que ahora internamente usa FacultadCard)
import VerFacultades from './Components/VerFacultad/VerFacultad'; // Asegúrate de que la ruta sea correcta
import FacultadCard from './Components/VerFacultad/FacultadCard'; // Importa el card directamente

const App = () => {
  const [selectedFacultadId, setSelectedFacultadId] = useState(null);
  const [facultadesList, setFacultadesList] = useState([]); // Estado para la lista de facultades
  const [loadingList, setLoadingList] = useState(true);    // Estado para la carga del listado
  const [errorList, setErrorList] = useState(null);       // Estado para errores del listado

  // Simulación de carga de IDs de facultades
  useEffect(() => {
    const fetchFacultadesIds = async () => {
      try {
        // Simula una llamada a la API para obtener un listado de IDs y nombres
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
        }, 800); // Pequeño retraso para simular la carga

      } catch (err) {
        setErrorList('No se pudo cargar el listado de facultades.');
        setLoadingList(false);
        console.error("Error al cargar listado de facultades:", err);
      }
    };

    fetchFacultadesIds();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleViewFacultad = (id) => {
    setSelectedFacultadId(id);
  };

  const handleGoBack = () => {
    setSelectedFacultadId(null); // Vuelve a null para mostrar el listado
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {selectedFacultadId ? (
        // Si hay un ID seleccionado, mostramos los detalles de esa facultad
        <VerFacultades
          facultadId={selectedFacultadId}
          onGoBack={handleGoBack}
        />
      ) : (
        // Mostrar cards de facultades en vez de lista
        loadingList ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Cargando listado...</Typography>
          </Box>
        ) : errorList ? (
          <Alert severity="error">{errorList}</Alert>
        ) : (
          <>
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
              onGoBack={() => {}} // No hace nada en el listado
            />
          </>
        )
      )}
    </Container>
  );
};

export default App;