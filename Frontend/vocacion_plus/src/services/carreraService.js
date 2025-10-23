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

// Buscar carrera por nombre usando paginado simple (si no existe endpoint de búsqueda)
export const findCarreraByName = async (name) => {
  try {
    // Intentamos iterar páginas hasta encontrar coincidencia exacta
    let page = 1;
    const pageSize = 50;
    while (page < 20) { // límite de seguridad
      const resp = await axios.get(`${API_URL}?pageNumber=${page}`);
      const data = resp.data;
      const items = data?.Data || data?.data || data?.items || data || [];
      const arr = Array.isArray(items) ? items : (items?.Data || []);
      const found = arr.find(c => c.nombre?.toLowerCase() === name.toLowerCase() || c.Nombre?.toLowerCase() === name.toLowerCase());
      if (found) return found;
      if (!arr || arr.length < pageSize) break;
      page += 1;
    }
    return null;
  } catch (error) {
    console.error('Error buscando carrera por nombre:', error);
    throw error;
  }
};
