import React, { useState, useEffect } from 'react'; // Agregamos useEffect por si quieres cargar IDs dinámicamente
import { Box, CircularProgress, Alert, Pagination, TextField, Button, IconButton, Collapse  } from '@mui/material';
import { eliminarFacultad, getCarrerasEnFacultadCard, getFacultades, buscarFacultadPorNombre } from '../../services/facultadService';
import FacultadCard from './FacultadCard'; // Importa el card directamente
import FABButton from '../boton/alta';
import SearchIcon from '@mui/icons-material/Search';
import '../../App.css';
import { jwtDecode } from 'jwt-decode';

const FacultadList = () => {
  const [page, setPage] = useState(1);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(9);
  const [facultades, setFacultades ] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [localidad, setLocalidad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [error, setError] = useState(null);
  const [ search , setSearch] = useState('');
  const [ filtros, setFiltros] = useState({nombre: '', localidad: '', provincia: '', accesibilidad: ''});
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
    console.log('ahora si?..', filtros.accesibilidad)
    const fetchFacultades = async () => {
      setLoading(true);
      setError(null);

      try {
        let data; 
        if (
          !filtros.nombre.trim() &&
          !filtros.localidad.trim() &&
          !filtros.provincia.trim() &&
          !filtros.accesibilidad.trim()
        ) {
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
          data = await buscarFacultadPorNombre(
            filtros.nombre,
            filtros.localidad,
            filtros.provincia,
            filtros.accesibilidad,
            page, pageSize);
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
  }, [page, filtros]);

// Handler de búsqueda
  const handleSearch = async () => {
    setPage(1);
    setFiltros({
      nombre: search,
      localidad,
      provincia,
      accesibilidad: filtros.accesibilidad
    });
  };
  
  console.log('ok supuestamente buscamos...', filtros.accesibilidad)

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
          flexDirection: 'column',
          gap: 1,
          mb: 3,
          justifyContent: 'center',
          pt: 2,
          alignItems: 'center',
        }}>
      {/* Línea principal: buscador + botón de filtros + buscar */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          width: '100%',
          maxWidth: '80%',
        }}>
      <TextField
        onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
        placeholder="Buscar facultad..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        variant="filled"
        sx={{
          flex: 1,
          borderRadius: 4,
          backgroundColor: 'var(--primaryColor-light)',
          '& .MuiInputBase-input': {
            color: '#fff',
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
        }}
      />
    
      <IconButton
        onClick={handleSearch}
        sx={{
          bgcolor: 'var(--primaryColor-light)',
          '&:hover': { bgcolor: 'darkred' },
          color: '#fff',
          width: 50,
          height: 50,
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
      <Button
        variant="text"
        onClick={() => setMostrarFiltros(prev => !prev)}
        sx={{
          color: '#fff',
          fontWeight: 700,
          textTransform: 'none',
          mt: 1,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
        }}
      >
        {mostrarFiltros ? 'Ocultar filtros ▲' : 'Mostrar filtros ▼'}
      </Button>
        <Collapse in={mostrarFiltros} sx={{ width: '80%', mt: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
            <TextField
              placeholder="Provincia..."
              value={provincia}
              onChange={e => setProvincia(e.target.value)}
              variant="filled"
              sx={{
                flex: 1,
                borderRadius: 4,
                backgroundColor: 'var(--primaryColor-light)',
                '& .MuiInputBase-input': { color: '#fff', fontWeight: 700 },
              }}
            />

            <TextField
              placeholder="Localidad..."
              value={localidad}
              onChange={e => setLocalidad(e.target.value)}
              variant="filled"
              sx={{
                flex: 1,
                borderRadius: 4,
                backgroundColor: 'var(--primaryColor-light)',
                '& .MuiInputBase-input': { color: '#fff', fontWeight: 700 },
              }}/>
               <TextField
                  select
                  label="Accesibilidad"
                  value={filtros.accesibilidad || ''}
                  onChange={e => setFiltros(prev => ({ ...prev, accesibilidad: e.target.value }))}
                  SelectProps={{ native: true }}
                  variant="filled"
                  sx={{
                    flex: 1,
                    minWidth: 150,
                    borderRadius: 4,
                    p: 4,
                    backgroundColor: 'var(--primaryColor-light)',
                    '& .MuiInputBase-input': { color: '#fff', fontWeight: 700 },
                    '& .MuiInputLabel-root': { color: '#fff' },
                  }}
                >
                  <option sx={{p : 1}}value="">Todos</option>
                  <option sx={{p : 1}}value="true">Pública</option>
                  <option sx={{p : 1}}value="false">Privada</option>
                </TextField>
          </Box>
        </Collapse>
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
