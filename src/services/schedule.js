import api from "./index.js";

const getSchedule = async () => {
  try {
    const response = await api.get("schedule/");

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los horarios de las clases: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default getSchedule;
