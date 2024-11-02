import api from "./index.js";

const getLogin = async (credentials) => {
  try {
    const response = await api.post("login/", credentials);

    return { status: response.status, data: response.data };
  } catch (error) {
    console.error(
      "Error en el login",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default getLogin;
