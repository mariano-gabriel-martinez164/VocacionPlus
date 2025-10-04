import React from 'react';
import FacultadCard from './FacultadCard'; // ¡Ahora FacultadCard es el que contiene toda la lógica y el estilo!

const VerFacultad = ({ facultadId, onGoBack }) => {
  return (
    <div className="container">
      hola Mudo
    <FacultadCard facultadId={facultadId} onGoBack={onGoBack} />
      </div>
  );
};

export default VerFacultad;