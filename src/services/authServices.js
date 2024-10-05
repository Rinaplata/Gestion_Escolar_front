import api from './index.js';

const login = async (credentials) => {
  try {
    const response = await api.post('login/', credentials);

    return response.data; 
  } catch (error) {
    console.error('Error en el login', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default login;

