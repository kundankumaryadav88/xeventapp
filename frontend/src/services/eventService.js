import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getAllEvents = async (userData) => {
  const response = await axios.get(`${API_URL}/api/events`, {params: userData});
  return response.data;
};

export const getEventById = async(id) => {
  const response = await axios.get(`${API_URL}/api/events/${id}`);
  return response.data;
}

