// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importá tus componentes (pantallas)
import Facultad from "./Components/VerFacultad/Facultad";
import Carreras from "./Components/Carreras/Carreras";
import VerCarrera from "./Components/Carreras/VerCarrera";
import Usuario from "./Components/Usuario/Usuario";
import Login from "./Components/Usuario/Login";
import Register from "./Components/Usuario/Registro";
import Bar from "./Components/Bar/Bar";
import { Box } from "@mui/system";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <Router>
      <Box sx={{
        minHeight: "100vh",
        display: 'flex',
        flexDirection: "column",
        bgcolor: 'var(--gray-light)',
      }}>
        <Bar />
        <Box sx={{ flexGrow: 1, alignItems: 'start' }}>
          <Routes>
            <Route path="/facultad" element={<Facultad />} />
            <Route path="/carrera" element={<Carreras />} />
            <Route path="/carrera/:nombre" element={<VerCarrera />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
