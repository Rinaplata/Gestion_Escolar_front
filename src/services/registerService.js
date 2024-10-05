import api from "./index.js";

const register = async (formData) => {
    try {
      const response = await api.post("register/", formData);
      return response.data;
    } catch (error) {
      console.error(
        "Error en el registro",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  
  export default register;