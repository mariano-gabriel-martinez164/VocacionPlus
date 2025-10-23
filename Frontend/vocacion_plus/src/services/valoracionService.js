import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:7225/api';

export const getValoracionesByCarrera = async (carreraId, page = 1, pageSize = 5) => {
  try {
    const response = await axios.get(`${API_URL}/Valoracion/carrera/${carreraId}?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las valoraciones:", error);
    throw error;
  }
};

export const createValoracion = async (valoracionData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No autorizado');
    }

    const response = await axios.post(`${API_URL}/Valoracion`, valoracionData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la valoración:", error);
    throw error;
  }
};

export const deleteValoracion = async (valoracionId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No autorizado');
    }

    const response = await axios.delete(`${API_URL}/Valoracion/${valoracionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la valoración:', error);
    throw error;
  }
};

// Helper: obtener todas las valoraciones de una carrera (iterando páginas)
export const getAllValoracionesByCarrera = async (carreraId) => {
  try {
    const pageSize = 50; // ajustar según backend permita
    let page = 1;
    let all = [];
    while (true) {
      const response = await axios.get(`${API_URL}/Valoracion/carrera/${carreraId}?page=${page}&pageSize=${pageSize}`);
      const data = response.data;
      // extraer array de valoraciones según posible shape
      const items = data?.items || data?.valoraciones || data?.data || data || [];
      // si items es un objeto con paging, intentar Data
      const arr = Array.isArray(items) ? items : (items?.Data || items?.data || []);
      if (!arr || arr.length === 0) break;
      all = all.concat(arr);
      // si la respuesta trae info de paginado y ya no hay más páginas, salir
      if (data?.totalPages && page >= data.totalPages) break;
      if (arr.length < pageSize) break;
      page += 1;
    }
    return all;
  } catch (error) {
    console.error('Error al obtener todas las valoraciones:', error);
    throw error;
  }
};