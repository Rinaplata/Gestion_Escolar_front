import api from "./index.js";

const getOneTeacher = async () => {
  try {
    const response = await api.get("teachers/");

    return response.data;
  } catch (error) {
    console.error(
      "Error obtener los profesores",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { getOneTeacher };
