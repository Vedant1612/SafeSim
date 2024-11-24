import axios from 'axios';

const API = axios.create({ baseURL: 'https://safesim.onrender.com' });

export const startSimulation = (type) => API.post('/simulate', { type });
export const fetchLogs = () => API.get('/logs');
export const saveConfig = (config) => API.post('/save-config', config);
