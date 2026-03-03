import axios from "axios";

const url = 'http://localhost:5073/usuario';

// === Registro de usuario ===
export const registerUser = async (data) => {
  const response = await axios.post(`${url}/register`, data);
  return response.data;
};

// === Inicio de sesión ===
export const loginUser = async (data) => {
  const response = await axios.post(
    `${url}/iniciar-sesion`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const token = response.data.token;
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", response.data.id); // Guardar el ID del usuario
  }
  return response.data;
};

// === Buscar usuarios (con paginación y filtro opcional) ===
export const buscarUsuarios = async (nombre, page = 1, pageSize = 10) => {
  const token = localStorage.getItem("token");
  const params = { page, pageSize };
  if (nombre) params.nombre = nombre;

  try {
    console.log("🟢 Buscando usuarios con:", { nombre, page, pageSize });
    const response = await axios.get(`${url}/buscar`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error buscando usuarios:", error.response || error);
    throw error;
  }
};

// === Banear usuario ===
export const banearUsuario = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${url}/${id}/banear`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`🚫 Usuario ${id} baneado correctamente`);
    return response;
  } catch (error) {
    console.error("❌ Error baneando usuario:", error.response || error);
    throw error;
  }
};

// === Activar usuario ===
export const activarUsuario = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${url}/${id}/activar`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`✅ Usuario ${id} activado correctamente`);
    return response;
  } catch (error) {
    console.error("❌ Error activando usuario:", error.response || error);
    throw error;
  }
};

// === Obtener usuario por ID ===
export const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error obteniendo usuario por ID:", error.response || error);
    throw error;
  }
};

// === Cerrar sesión ===
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  console.log("👋 Sesión cerrada correctamente");
};
// === Obtener usuario por ID ===


// === Actualizar datos de usuario (nombre, email, etc.) ===
export const updateUser = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${url}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// === Actualizar contraseña ===
export const updatePassword = async (id, nuevaClave) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${url}/${id}/clave`,
    { clave: nuevaClave },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// === Cerrar sesión (endpoint del backend) ===
export const logoutAPI = async () => {
  const token = localStorage.getItem("token");
  await axios.post(`${url}/cerrar-sesion`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

