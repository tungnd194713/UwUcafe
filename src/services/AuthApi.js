import apiClient from '../APIclient'

const login = async (data) => {
      const response = await apiClient.post('/login', data);
      return response.data
};

export default {
    login,
}