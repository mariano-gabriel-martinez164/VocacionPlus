import {
  Autocomplete,
  TextField,
  Typography,
  InputAdornment,
  Divider,
  Fab,
  Pagination,
  styled,
  CircularProgress,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CarreraCard from "./CarreraCard";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { buscarCarrerasPorNombre } from '../../services/carreraService';
import axios from "axios";

// === Estilos personalizados para la paginación ===
const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "var(--primary-300)",
    border: "1px solid var(--primary-300)",
  },
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "var(--primary-100)",
  },
  "& .Mui-selected": {
    backgroundColor: "var(--primary-500)",
    color: "#fff",
  },
  "& .MuiPaginationItem-ellipsis": {
    color: "gray",
  },
}));

// === Componente principal ===
const Carrera = () => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // === Cargar carreras desde el backend (paginadas) ===
  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5073/Carrera?PageNumber=${page}`);
        const data = res.data;

        if (Array.isArray(data.data)) {
          setCarreras(data.data);
          setTotalPages(data.totalPages || 1);
        } else if (Array.isArray(data)) {
          setCarreras(data);
          setTotalPages(1);
        } else {
          console.warn("Formato inesperado:", data);
          setCarreras([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error al cargar carreras:", err);
        setError("No se pudieron cargar las carreras.");
        setLoading(false);
      }
    };

    fetchCarreras();
  }, [page]);

	const handleSearchChange = async (event, newValue) => {
		setSearch(newValue);
		if (newValue.trim() === '') return
		try {
			const data = await buscarCarrerasPorNombre(newValue,page);
			console.log('supuestamente mandamos esto :', newValue);
			console.log('y llega esto?', data)
			setCarreras(data.carreras || []);
			setTotalPages(data.totalPages || 1);
		} catch (err) {

		console.error(err);
		setError('error al buscar carreras')
		}
	};

  // === Navegar al formulario de Alta Carrera ===
  const handleOnClick = () => {
    navigate("/AltaCarrera");
  };

  // === Filtrado por nombre ===
  const filteredCarreras = search
    ? carreras.filter((c) =>
        c.nombre?.toLowerCase().includes(search.toLowerCase())
      )
    : carreras;

  // === Estado de carga ===
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // === Estado de error ===
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // === Render principal ===
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        /* 🌈 DEGRADADO DE FONDO */
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1a0000 0%, #330000 40%, #0d0d0d 100%)",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        pb: 6,
        color: "var(--color-texto)",
        transition: "background 0.6s ease",
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* === Título + Buscador === */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ m: 14, pt: 2, mt: 0, mb: 3 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#fff",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            flexGrow: 1,
          }}
        >
          Carreras
        </Typography>

        {/* === Buscador === */}
        <Box
          sx={{
            flexGrow: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Autocomplete
            freeSolo
            disableClearable
            options={carreras.map((carrera) => carrera.nombre)}
            value={search}
            onInputChange={handleSearchChange}
            sx={{
              width: "100%",
              maxWidth: 700,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(0,0,0,0.4)",
                borderRadius: "40px",
                color: "#fff",
                border: "2px solid var(--primary-500)",
                transition: "all 0.3s ease",
                boxShadow: "0 0 10px rgba(255,255,255,0.15)",
                "&:hover": {
                  borderColor: "var(--primary-300)",
                  boxShadow: "0 0 16px rgba(255,255,255,0.25)",
                },
                "&.Mui-focused": {
                  borderColor: "var(--primary-200)",
                  boxShadow: "0 0 20px rgba(255,255,255,0.4)",
                },
              },
              "& .MuiInputBase-input": {
                color: "#fff",
                fontSize: "1rem",
                padding: "12px 48px 12px 20px",
              },
              "& .MuiAutocomplete-endAdornment": {
                right: 12,
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Buscar carrera..."
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: "var(--primary-500)",
                        color: "#fff",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "var(--primary-300)",
                          transform: "scale(1.1)",
                          boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                        },
                      }}
                    >
                      <SearchIcon />
                    </Box>
                  ),
                }}
              />
            )}
          />
        </Box>
      </Stack>

      <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.4)", mr: 8, ml: 8 }} />

      {/* === Grilla de Carreras === */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: 3,
          px: "6vw",
          py: "4vh",
        }}
      >
        {filteredCarreras.map((item, index) => (
          <CarreraCard key={index} carrera={item} index={index} />
        ))}
      </Box>

      {/* === Botón flotante === */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Fab
          aria-label="add"
          onClick={handleOnClick}
          sx={{
            color: "var(--primary-200)",
            bgcolor: "var(--gray-light)",
            border: 2,
            borderColor: "var(--primary-200)",
            transition: "all 0.3s ease",
            position: "relative",
            bottom: 20,
            right: 16,
            "&:hover": {
              bgcolor: "var(--primary-500)",
              transform: "scale(1.08)",
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* === Paginación === */}
      <Box display="flex" justifyContent="center">
        <CustomPagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
};

export default Carrera;
