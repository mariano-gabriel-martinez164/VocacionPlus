import axios from "axios";

const API_URL = "http://localhost:5073/carrera";

// Obtener carreras por facultad (paginadas)
export const getCarrerasByFacultad = async (facultadId, pageNumber = 1) => {
  try {
    const response = await axios.get(`${API_URL}/facultad/${facultadId}?pageNumber=${pageNumber}`);
    return response.data; // contiene { TotalItems, TotalPages, CurrentPage, Data }
  } catch (error) {
    console.error("Error al obtener las carreras por facultad:", error);
    throw error;
  }
};

// Obtener una carrera por ID
export const getCarreraById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la carrera:", error);
    throw error;
  }
};

export const buscarCarrerasPorNombre = async (nombre, page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${API_URL}/buscar`,{
      params : { nombre,page, pageSize},
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}
