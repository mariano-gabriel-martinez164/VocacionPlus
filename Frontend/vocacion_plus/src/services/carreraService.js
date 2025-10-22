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
