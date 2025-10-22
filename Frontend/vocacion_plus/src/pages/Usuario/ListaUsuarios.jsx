import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
  Pagination,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import ListIcon from '@mui/icons-material/List';
import { banearUsuario, buscarUsuarios, activarUsuario } from '../../services/userService';
import MisValoracionesModal from '../../Components/modalValo/modalValoAutor';
import './ListaUsuarios.css';
import '../../index.css';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelect] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await buscarUsuarios(searchTerm, page, pageSize);
        setUsuarios(data.usuarios || []);
        setTotalItems(data.total || data.usuarios.length);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [searchTerm, page]);

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(search);
  };


  const handleBanear = async (id, honorActual) => {
  try {
    if (honorActual) {
      await banearUsuario(id);
    } else {
      await activarUsuario(id);
    }

    // Actualizamos la lista sin recargar
    setUsuarios(prev =>
      prev.map(u =>
        u.id === id ? { ...u, honor: !honorActual } : u
      )
    );
    } catch (error) {
      console.error('Error actualizando honor:', error);
    }
  };

  const handleOpenModal = (userId) => {
    setSelect(userId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelect(null);
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box sx={{ p: 3, minHeight:'100vh', color:'var(--color-texto)' }}>
      {/* 🔍 Barra de búsqueda */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, justifyContent: 'center' }}>
        <TextField
          placeholder="Buscar por nombre o correo..."
          variant="filled"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          sx={{ flex: 1, maxWidth: '70%', backgroundColor: 'var(--color-fondo)', input: { color: 'var(--color-texto)'},
        '& .MuiFilledInput-root':{
          borderRadius: '8px',
          backgroundColor: 'var(--primaryColor-dark)',
          '&:hover' : {backgroundColor: 'var(--primaryColor-default)'},
          '&:before, &:after' : {border: 'none' },
        } }}
        />
        <IconButton onClick={handleSearch} sx={{backgroundColor: 'var(--primaryColor-lighter)',
          color: 'var(--color-texto)',
          '&:hover' : {backgroundColor: 'var(--primaryColor-light)'},
        }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {usuarios.map((u) => (
          <Box
            key={u.id}
            sx={{
              p: 2,
              border: '1px solid var(--primaryColor-default)',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--primaryColor-darker)',
              '&:hover' : {
                backgroundColor: 'var(--primaryColor-dark)',
                transform: 'scale(1.01)',
                transition: '0.2s',
              },
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--color-texto)'}}>
                {u.nombre} {u.apellido} 
              </Typography>
              <Typography sx={{color: '#ccc'}}> {u.correo} </Typography>
              <Box
                component="span"
                sx={{
                  ml: 1,
                  color: u.honor ? 'green' : 'var(--primaryColor-white)',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {u.honor ? 'Honorable' : 'Baneado'}
              </Box>
            </Box>

            <Box>
              <IconButton sx={{color: 'var(--color-texto)'}} onClick={() => handleOpenModal(u.id)}>
                <ListIcon />
              </IconButton>
              <IconButton color={u.honor ? "error" : "success"} onClick={() => handleBanear(u.id, u.honor)}
                sx={{
                  ml:1,
                  backgroundColor: u.honor ? 'var(--colorPrimary-light)' : 'green',
                  color: 'white',
                  '&:hover' : {
                    backgroundColor: u.honor ? 'var(--primaryColor-lighter)' : '#4CAF50',
                  },
                }}>
                {u.honor ? <DeleteIcon />: <RestoreIcon />}
              </IconButton>
            </Box>
          </Box>
        ))}
        {usuarios.length === 0 && <Alert severity="info">No se encontraron usuarios.</Alert>}
      </Box>
 
      {totalItems > pageSize && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(totalItems / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
             sx={{
              '& .MuiPaginationItem-root': {
                color: 'var(--color-texto)',
                '&.Mui-selected': {
                  backgroundColor: 'var(--primaryColor-lighter)',
                  color: 'white',
                },
              },
            }}
          />
        </Box>
      )}
      <MisValoracionesModal
        autorId={selectedUserId}
        open={openModal}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default ListaUsuarios;
