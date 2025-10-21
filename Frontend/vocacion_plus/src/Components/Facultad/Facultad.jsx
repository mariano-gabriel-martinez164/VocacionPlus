import React, { useState, useEffect } from 'react'; // Agregamos useEffect por si quieres cargar IDs dinámicamente
import { Box, CircularProgress, Alert, Pagination, TextField, Button, IconButton  } from '@mui/material';
import { eliminarFacultad, getCarrerasEnFacultadCard, getFacultades, buscarFacultadPorNombre } from '../../services/facultadService';
// Importamos el componente VerFacultades (que ahora internamente usa FacultadCard)
import VerFacultades from './VerFacultad'; // Asegúrate de que la ruta sea correcta
import FacultadCard from './FacultadCard'; // Importa el card directamente
import FABButton from '../boton/alta';
import SearchIcon from '@mui/icons-material/Search';
import '../../App.css';
import { jwtDecode } from 'jwt-decode';

const FacultadList = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(9);
  const [facultades, setFacultades ] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [error, setError] = useState(null);
  const [ search , setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const rol = user?.role || null; 

  const handleEliminarFacultad = async (id) => {
    try {
      await eliminarFacultad(id);
      setFacultades(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchFacultades = async () => {
      setLoading(true);
      setError(null);

      try {
        let data; 
        if (searchTerm.trim() === '') {
          data = await getFacultades(page, pageSize);
          
          const facultadesBase = data.facultades || data.data || [];
          const total = data.totalItems || data.totalitems || data.TotalItems || 0;

          const facultadesConCarreras = await Promise.all(
            facultadesBase.map(async (fac) => {
              const carreras = await getCarrerasEnFacultadCard(fac.id);
              return {...fac, carreras};
            })
          );
          setFacultades(facultadesConCarreras);
          setTotalItems(total);
        } else {
          data = await buscarFacultadPorNombre(searchTerm, page, pageSize);
          const resultados = data.results || [];
          const total = data.total || 0;
          const facultadesConCarreras = await Promise.all(
            resultados.map(async (fac) => {
              const carreras = await getCarrerasEnFacultadCard(fac.id);
              return { ...fac, carreras };
            })
          );
          setFacultades(facultadesConCarreras);
          setTotalItems(total);
        }
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las facultades.');
      } finally {
        setLoading(false);
      }
    };
    fetchFacultades();
  }, [page, searchTerm]);

// Handler de búsqueda
  const handleSearch = async () => {
    setPage(1);
    setSearchTerm(search);
  };

  if (loading || searchLoading) return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',          
      minHeight: '60vh',             
      background: 'linear-gradient(180deg, var(--primaryColor-default) 0%, var(--backgroundColor-default) 100%)',
      width: '100%',
    }}>
      <CircularProgress size={48} />  
    </Box>
  );

  if (error) return  (
    <Box sx={{
      display: 'flex', justifyContent: 'center', mt:4, background: 'linear-gradient(180deg, var(--primaryColor-default) 0%, var(--backgroundColor-default) 100%)'
    }}>
      <Alert severity='error'>{error}</Alert>
    </Box>
  );

  return (
    <Box sx= {{ background: 'linear-gradient(180deg, var(--primaryColor-default) 0%, var(--backgroundColor-default) 100%)'}}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 3,
          justifyContent: 'center',
          pt: 2,
        }}
      >
        {/* Input de búsqueda */}
      <TextField
        onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
        placeholder="Buscar facultad..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        variant="filled"
        sx={{
          flex: 1,
          maxWidth: '80%',
          borderRadius: 4,
          backgroundColor: 'var(--primaryColor-light)',
          '& .MuiInputBase-input': {
            color:'#fff',
            fontWeight: 700,
            fontSize: '1.1rem',     
            paddingTop: '12px',      
            paddingBottom: '12px',   
          },
          '& .MuiInputBase-root:before, & .MuiInputBase-root:after': {
            borderBottom: 'none',
          },
          '& .MuiInputBase-root:hover': {
            backgroundColor: 'var(--primaryColor-lighter)',
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
            top: '50%',             
            transform: 'translateY(-50%)',
          }
        }}/>
      <IconButton
        onClick={handleSearch}
        sx={{
          bgcolor: 'var(--primaryColor-light)',
          '&:hover': { bgcolor: 'darkred' },
          color: '#fff',
          width: 50,
          height: 50,
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}>
        <SearchIcon />
      </IconButton>
      </Box>

      <FacultadCard facultades={facultades} Eliminar={handleEliminarFacultad} />
      { rol === "Admin" && <FABButton ruta="/alta-facultad" />}
      {totalItems > pageSize && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 10  }}>
          <Pagination
            count={Math.ceil(totalItems / pageSize)} 
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'var(--primaryColor-white)', 
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: 'var(--primaryColor-light)',
                color: '#fff',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default FacultadList;
