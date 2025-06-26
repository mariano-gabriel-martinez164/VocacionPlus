import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerFacultades from './Components/Facultad/VerFacultad';
import ListadoDeFacultades from './Components/Facultad/ListadoDeFacultades';
import FacultadCard from './Components/Facultad/FacultadCard';
import AltaFacultad from './Components/Facultad/AltaFacultad';
const App = () => {
  return (
    <Router>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/altaFacultad" element={<AltaFacultad />} />
          <Route path="/" element={<ListadoDeFacultades />} />
          <Route path="/facultad/:id" element={<VerFacultades />} />
          <Route path="/facultad/:id/card" element={<FacultadCard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;