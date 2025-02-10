import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => {
  return axios.get(API_URL);
};

export const createUser = (userData) => {
  return axios.post(API_URL, userData);
};

export const updateUser = (userId, updatedData) => {
  return axios.put(`${API_URL}/${userId}`, updatedData);
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/${userId}`);
};
