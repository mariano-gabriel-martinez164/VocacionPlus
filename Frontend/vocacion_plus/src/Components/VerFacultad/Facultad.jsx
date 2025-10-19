import React, { useState, useEffect } from 'react'; // Agregamos useEffect por si quieres cargar IDs dinámicamente
import {
  Container,
  Typography,
  Box,
  CircularProgress, // Para simular carga del listado de IDs
  Alert, // Para mensajes de error si la carga de IDs falla
  Autocomplete,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Importamos el componente VerFacultades (que ahora internamente usa FacultadCard)
import VerFacultades from './VerFacultad'; // Asegúrate de que la ruta sea correcta
import FacultadCard from './FacultadCard'; // Importa el card directamente

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
    <Container sx={{ mt: 4, mb: 4 }}>
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
        <Typography variant="h4" sx={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "var(--primary-200)",
          flexGrow: 1,
        }}>
          Facultades
        </Typography>
       <Autocomplete
          sx={{
            alignContent: "center",
            flexGrow: 2,
          }}
          freeSolo
          disableClearable
          options={facultadesList ? facultadesList.map(f => f.nombre) : []}
          onChange={(event, value) => {
            // Cuando se selecciona una opción por nombre, buscamos su id y mostramos la facultad
            const fac = facultadesList.find(f => f.nombre === value);
            if (fac) handleViewFacultad(fac.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Facultades"
              variant="outlined"
              size="medium"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon fontSize="large" />
                  </InputAdornment>
                ),
                style: {
                  backgroundColor: "var(--secondary-500)",
                  borderRadius: "12px",
                  color: "var(--secondary-500)",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" }, // saca el borde del input
                },
                input: { color: "var(--secondary-100)" }, // color del placeholder/texto
              }}
            />
          )}
        />
            <FacultadCard
              facultades={facultadesList.map(f => ({
                ...f,
                descripcion: 'Descripción breve de la facultad.',
                ubicacion: 'Ubicación genérica',
                carreras: [
                  { id: '1', nombre: 'Carrera 1' },
                  { id: '2', nombre: 'Carrera 2' }
                ],
                imagen: `https://imgs.search.brave.com/qS0oKh7SXE1Y7BJvuIzSVFkJuKStVDSYEjdAmdo4vzY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yZXRy/YXRvLWRlLWdhdGl0/by1ncmFjaW9zby1z/dWUlQzMlQjFvLWJs/YW5jby1hY2VyY2Ft/aWVudG8tZ2F0b3Mt/MjAyMjQ3NzQ5Lmpw/Zw`
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