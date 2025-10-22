import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// Simulación de una llamada a tu API de backend
// En un caso real, aquí usarías axios para llamar a tu endpoint de ASP.NET
const postCareerComment = (careerId, data) => {
  console.log(`Enviando a /api/carreras/${careerId}/comentarios`, data);
  // Simulamos una demora de red de 1.5 segundos
  return new Promise((resolve) => setTimeout(resolve, 1500)); 
};

const CareerRatingForm = ({ careerId, onCommentSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Validación simple: asegúrate de que el usuario califique y comente
    if (rating === 0 || comment.trim() === '') {
      setError('Debes seleccionar una calificación y escribir un comentario.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Llamamos a la función que se conecta con el backend
      await postCareerComment(careerId, { rating, comment });
      
      setSuccess('¡Gracias! Tu opinión sobre la carrera ha sido enviada.');
      // Reseteamos el formulario
      setRating(0);
      setComment('');
      
      // Ejecutamos la función callback para notificar al componente padre
      if (onCommentSubmitted) {
        onCommentSubmitted();
      }
    } catch (apiError) {
      setError('No se pudo enviar tu opinión. Inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: 'auto', // Centra el formulario horizontalmente
        p: 3, // Padding interno
        boxShadow: 3, // Sombra para darle profundidad
        borderRadius: 2, // Bordes redondeados
        mt: 4, // Margen superior
      }}
    >
      <Typography variant="h5" component="h3" gutterBottom align="center">
        Califica esta Carrera
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Rating
          name="career-rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="large" // Estrellas de tamaño grande
        />
      </Box>
      
      <TextField
        id="career-comment-textfield"
        label="¿Qué te pareció la carrera?"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        variant="outlined"
        fullWidth // Ocupa todo el ancho disponible
        required
      />
      
      <Box sx={{ mt: 2, position: 'relative' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Opinión'}
        </Button>
        {isSubmitting && (
          <CircularProgress
            size={24}
            sx={{
              color: 'primary.contrastText',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>

      {/* Alertas para feedback */}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
    </Box>
  );
};

export default CareerRatingForm;
