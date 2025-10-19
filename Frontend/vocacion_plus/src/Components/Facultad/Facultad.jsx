import React, { useState, useEffect } from 'react'; // Agregamos useEffect por si quieres cargar IDs dinámicamente
import { Box, CircularProgress, Alert, Pagination } from '@mui/material';
import { getCarrerasEnFacultadCard, getFacultades } from '../../services/facultadService';

// Importamos el componente VerFacultades (que ahora internamente usa FacultadCard)
import VerFacultades from './VerFacultad'; // Asegúrate de que la ruta sea correcta
import FacultadCard from './FacultadCard'; // Importa el card directamente

const FacultadList = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(9);
  const [facultades, setFacultades ] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching a facultad por pag", page);
      setLoading(true);
      setError(null);
      try {
        const data = await getFacultades(page, pageSize);
        console.log("datos del endpoint f: ", data);
        const carrerasCard = await Promise.all(
          data.facultades.map(async (fac) => {
            const carrera = await getCarrerasEnFacultadCard(fac.id);
            console.log(`Carreras para facultad ${fac.nombre}:`, carrera);
            return {...fac, carreras : carrera};
          })
        );
        console.log("f final loco: ", carrerasCard);
        setFacultades(carrerasCard);
        setTotalItems(data.totalItems);
      } catch {
        setError('no se puedieron cargar las facultades.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  if (loading) return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', mt:4
    }}>
      <CircularProgress />
    </Box>
  );
  if (error) return  (
    <Box sx={{
      display: 'flex', justifyContent: 'center', mt:4
    }}>
      <Alert severity='error'>{error}</Alert>
    </Box>
  );

  return (
    <>
      <FacultadCard facultades={facultades} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(totalItems / pageSize)} 
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </>
  )
};

export default FacultadList;