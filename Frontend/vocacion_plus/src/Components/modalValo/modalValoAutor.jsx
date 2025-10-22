import { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Pagination,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getValoracionesAutor } from '../../services/valoServices';
import '../../index.css'

const MisValoracionesModal = ({ autorId, open, onClose }) => {
  const [valoraciones, setValoraciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage ] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    if (!open || !autorId) return; // evita fetch innecesario si el modal está cerrado
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
        const data = await getValoracionesAutor(autorId, 1, 5);
        setValoraciones(data.results || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error('Error cargando valoraciones:', err);
        setError('error al cargar las valoraciones.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [autorId, open, page]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-mis-valoraciones"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box
        sx={{
          width: 500,
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'var(--backgroundColor-default)',
          color: 'var(--color-texto)',
          borderRadius: 3,
          boxShadow: 8,
          p: 3,
          position: 'relative',
        }}
      >
        {/* Botón de cierre */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'var(--primaryColor-white)',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Título */}
        <Typography
          id="modal-mis-valoraciones"
          variant="h6"
          sx={{
            mb: 2,
            color: 'var(--primaryColor-white)',
            fontWeight: 'bold',
          }}
        >
            Valoraciones
        </Typography>

        <Divider sx={{ mb: 2, borderColor: 'var(--primaryColor-lighter)' }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress sx={{ color: 'var(--primaryColor-white)' }} />
          </Box>
        ) : error ? ( 
            <Alert severity='error'>{error}</Alert>
        ) : valoraciones.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'gray', textAlign: 'center' }}>
            Este usuario aun no tiene valoraciones.
          </Typography>
        ) : (
        <>
          {valoraciones.map((v) => (
            <Card
              key={v.id}
              sx={{
                mb: 2,
                backgroundColor: 'var(--primaryColor-dark)',
                color: 'var(--color-texto)',
                borderRadius: 2,
                border: '1px solid var(--primaryColor-light)',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', color: 'var(--primaryColor-white)' }}
                    >
                    {v.carreraNombre || 'Carrera desconocida'} — {v.puntuacion}
                    </Typography>
                    <MenuBookIcon sx={{ color: 'var(--secondary-300)' }} />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {v.comentario || 'Sin comentario.'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={totalPages}
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
            </>
        )}
      </Box>
    </Modal>
  );
};

export default MisValoracionesModal;
