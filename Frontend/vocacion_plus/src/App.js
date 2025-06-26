import React, { useState } from 'react';
import { Container } from '@mui/material';
import VerFacultades from './Components/VerFacultad/VerFacultad';
import ListadoDeFacultades from './Components/VerFacultad/ListadoDeFacultades';

const App = () => {
  const [selectedFacultadId, setSelectedFacultadId] = useState(null);

  const handleViewFacultad = (id) => {
    setSelectedFacultadId(id);
  };

  const handleGoBack = () => {
    setSelectedFacultadId(null);
  };

  return (
    <Container maxWidth="lg" >

    </Container>
  );
};

export default App;