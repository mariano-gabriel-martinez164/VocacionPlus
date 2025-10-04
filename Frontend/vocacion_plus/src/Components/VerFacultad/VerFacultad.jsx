import React from 'react';
import FacultadCard from './FacultadCard'; // ¡Ahora FacultadCard es el que contiene toda la lógica y el estilo!

const VerFacultad = ({ facultadId, onGoBack }) => {
  return (
    // FacultadCard manejará su propia carga, errores y visualización con el nuevo estilo
    <FacultadCard facultadId={facultadId} onGoBack={onGoBack} />
  );
};

export default VerFacultad;