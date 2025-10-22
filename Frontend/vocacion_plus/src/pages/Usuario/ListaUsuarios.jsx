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
import './ListaUsuarios.css';
import '../../App.css';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

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
    <Box sx={{ p: 3 }}>
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
          sx={{ flex: 1, maxWidth: '400px' }}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {usuarios.map((u) => (
          <Box
            key={u.id}
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <strong>{u.nombre} {u.apellido}</strong> - {u.correo}
              <Box
                component="span"
                sx={{
                  ml: 1,
                  color: u.honor ? 'green' : 'red',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {u.honor ? 'Honorable' : 'Baneado'}
              </Box>
            </Box>

            <Box>
              <IconButton color="primary">
                <ListIcon />
              </IconButton>
              <IconButton color={u.honor ? "error" : "success"} onClick={() => handleBanear(u.id, u.honor)}>
                {u.honor ? <DeleteIcon />: <RestoreIcon />}
              </IconButton>
            </Box>
          </Box>
        ))}
        {usuarios.length === 0 && <Alert severity="info">No se encontraron usuarios.</Alert>}
      </Box>

      {/* 📄 Paginación */}
      {totalItems > pageSize && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(totalItems / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      )}
    </Box>
  );
};

export default ListaUsuarios;
