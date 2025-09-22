import React from 'react';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import VerFacultades from './Components/Facultad/VerFacultad';
import ListadoDeFacultades from './Components/Facultad/ListadoDeFacultades';
import FacultadCard from './Components/Facultad/FacultadCard';
import AltaFacultad from './Components/Facultad/AltaFacultad';
import ModificarFacultad from './Components/Facultad/ModificarFacultad';
const App = () => {
  return (
      <Routes>
        <Route path="/modificarFacultad/:id" element={<ModificarFacultad />}/>
        <Route path="/altaFacultad" element={<AltaFacultad />} />
        <Route path="/" element={<ListadoDeFacultades />} />
        <Route path="/facultad/:id" element={<VerFacultades />} />
        <Route path="/facultad/:id/card" element={<FacultadCard />} />
      </Routes>
  );
};

export default App;