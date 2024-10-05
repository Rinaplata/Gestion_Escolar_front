import api from "./index.js";

const getRoles = async () => {
  try {
    const response = await api.get("roles/");

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener roles",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default getRoles;
