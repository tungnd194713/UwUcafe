import apiClient from '../APIclient'

const login = async (data) => {
    const response = await apiClient.post('/login', data);
    return response.data
};
const register = async (data) => {
    const response = await apiClient.post('/register', data);
    return response.data
};

export default {
    login, register
}