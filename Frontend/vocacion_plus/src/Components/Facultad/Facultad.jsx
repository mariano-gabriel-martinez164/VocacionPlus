import React, { useState, useEffect } from 'react'; // Agregamos useEffect por si quieres cargar IDs dinámicamente
import { Box, CircularProgress, Alert, Pagination } from '@mui/material';
import { eliminarFacultad, getCarrerasEnFacultadCard, getFacultades } from '../../services/facultadService';
import { useLocation } from "react-router-dom";
// Importamos el componente VerFacultades (que ahora internamente usa FacultadCard)
import VerFacultades from './VerFacultad'; // Asegúrate de que la ruta sea correcta
import FacultadCard from './FacultadCard'; // Importa el card directamente
import FABButton from '../boton/alta';
import '../../App.css';
import { jwtDecode } from 'jwt-decode';

const FacultadList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(9);
  const [facultades, setFacultades ] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [error, setError] = useState(null);

  const handleEliminarFacultad = async (id) => {
    try {
      await eliminarFacultad(id);
      setFacultades(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

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
  }, [page, pageSize ]);

  useEffect(() => {
	setPage(1);
	console.log("path actual:", location.pathname);
  }, [ location.pathname]);
	
  if (loading) return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', mt:4, background: 'linear-gradient(180deg, var(--primaryColor-default) 0%, var(--backgroundColor-default) 100%)'
    }}>
      <CircularProgress />
    </Box>
  );
  if (error) return  (
    <Box sx={{
      display: 'flex', justifyContent: 'center', mt:4, background: 'linear-gradient(180deg, var(--primaryColor-default) 0%, var(--backgroundColor-default) 100%)'
    }}>
      <Alert severity='error'>{error}</Alert>
    </Box>
  );

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const rol = user?.role || null; 

  return (
    <Box sx= {{ background: 'linear-gradient(180deg, var(--primaryColor-default) 0%, var(--backgroundColor-default) 100%)'}}>
      <FacultadCard facultades={facultades} Eliminar={handleEliminarFacultad} />
      { rol === "Admin" && <FABButton ruta="/alta-facultad" />}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(totalItems / pageSize)} 
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'var(--primaryColor-white)', // color de los números y flechas
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: 'var(--primaryColor-light)',
              color: '#fff',
            },
          }}
        />
      </Box>
    </Box>
  )
};

export default FacultadList;
