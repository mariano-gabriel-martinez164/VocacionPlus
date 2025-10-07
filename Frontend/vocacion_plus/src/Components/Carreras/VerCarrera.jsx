import React from "react";
import { useParams } from "react-router-dom";

const VerCarrera = () => {
  const parametro = useParams();
  const carrera = parametro.nombre; // con esto busco la carrera
  // console.log(carrera)
  return (<></>);
}

export default VerCarrera;
