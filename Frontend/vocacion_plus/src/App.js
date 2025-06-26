import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerFacultades from './Components/VerFacultad/VerFacultad';
import ListadoDeFacultades from './Components/VerFacultad/ListadoDeFacultades';
import FacultadCard from './Components/VerFacultad/FacultadCard';

const App = () => {
  return (
    <Router>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<ListadoDeFacultades />} />
          <Route path="/facultad/:id" element={<VerFacultades />} />
          <Route path="/facultad/:id/card" element={<FacultadCard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;