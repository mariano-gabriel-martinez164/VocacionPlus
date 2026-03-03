import axios from "axios";

const API_URL = "http://localhost:5073/Test";

export const getTestByUsuario = async (userId) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/usuario/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTest = async (body) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(API_URL, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteTest = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
