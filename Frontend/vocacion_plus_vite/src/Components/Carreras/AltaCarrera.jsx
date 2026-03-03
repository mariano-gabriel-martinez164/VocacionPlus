import React, { useState } from 'react';

// Importación de componentes de MUI
import { Box, Typography, TextField, Button, Chip, Stack } from '@mui/material';

// Paleta de colores consistente con el diseño anterior
const colors = {
    background: '#1a0f0f',
    primary: '#e63946',
    secondary: '#a8dadc',
    textPrimary: '#ffffff',
    textSecondary: '#f1faee',
    surface: '#2c3e50',
};

// Un componente TextField personalizado para el tema oscuro
// Esto evita repetir los estilos en cada campo del formulario
const StyledTextField = (props) => (
    <TextField
        variant="outlined"
        fullWidth
        InputLabelProps={{
            style: { color: colors.secondary },
        }}
        sx={{
            marginBottom: '1.5rem',
            '& .MuiOutlinedInput-root': {
                '& .MuiInputBase-input': {
                    color: colors.textPrimary, // Color del texto que escribe el usuario
                },
                '& fieldset': {
                    borderColor: colors.secondary, // Color del borde
                },
                '&:hover fieldset': {
                    borderColor: colors.textPrimary, // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                    borderColor: colors.primary, // Color del borde al hacer foco
                },
            },
        }}
        {...props}
    />
);


const AltaCarreraForm = () => {
    // Estado para cada campo del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [facultad, setFacultad] = useState('');
    const [planEstudio, setPlanEstudio] = useState('');
    
    // Estado para el manejo de los tags
    const [tags, setTags] = useState(['Ingeniería', 'Ciencia']);
    const [currentTag, setCurrentTag] = useState('');

    // Función para manejar la adición de nuevos tags
    const handleAddTag = (event) => {
        if (event.key === 'Enter' && currentTag.trim() !== '') {
            event.preventDefault(); // Evita que el formulario se envíe al presionar Enter
            if (!tags.includes(currentTag.trim())) {
                setTags([...tags, currentTag.trim()]);
            }
            setCurrentTag(''); // Limpia el input del tag
        }
    };

    // Función para eliminar un tag
    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };
    
    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        const carreraData = {
            nombre,
            descripcion,
            facultad,
            planEstudio,
            tags,
        };
        console.log("Datos de la carrera a enviar:", carreraData);
        alert("Carrera guardada. Revisa la consola para ver los datos.");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                backgroundColor: colors.background,
                color: colors.textPrimary,
                fontFamily: 'Roboto, sans-serif',
                maxWidth: 700,
                p: 4,
                borderRadius: '15px',
                margin: '2rem auto',
                border: `1px solid ${colors.surface}`
            }}
        >
            <Typography variant="h4" sx={{ color: colors.secondary, mb: 4, fontWeight: 'bold' }}>
                Dar de Alta una Carrera
            </Typography>

            <StyledTextField
                label="Nombre de la Carrera"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />

            <StyledTextField
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                multiline
                rows={4}
                required
            />

            <StyledTextField
                label="Facultad a la que pertenece"
                value={facultad}
                onChange={(e) => setFacultad(e.target.value)}
                required
            />

            <StyledTextField
                label="Plan de Estudio (URL o texto)"
                value={planEstudio}
                onChange={(e) => setPlanEstudio(e.target.value)}
                required
            />

            {/* Campo para agregar Tags */}
            <Box sx={{ marginBottom: '1.5rem' }}>
                 <StyledTextField
                    label="Añadir Tags (presiona Enter para agregar)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                />
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                    {tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            onDelete={() => handleDeleteTag(tag)}
                            sx={{
                                backgroundColor: colors.surface,
                                color: colors.secondary,
                                '& .MuiChip-deleteIcon': {
                                    color: colors.primary,
                                    '&:hover': {
                                        color: colors.textPrimary
                                    }
                                },
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                    backgroundColor: colors.primary,
                    '&:hover': {
                        backgroundColor: '#c0392b', // Un rojo un poco más oscuro
                    },
                    fontWeight: 'bold',
                    width: '100%',
                    padding: '0.8rem 0'
                }}
            >
                Guardar Carrera
            </Button>
        </Box>
    );
};

export default AltaCarreraForm;
