// API service - handles all backend communication
import axios from 'axios';

// Base URL for backend API
const API_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const signup = async (name, email, password) => {
  const response = await api.post('/auth/signup', { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Asset APIs
export const getAssets = async () => {
  const response = await api.get('/assets');
  return response.data;
};

export const createAsset = async (title, type, content) => {
  const response = await api.post('/assets', { title, type, content });
  return response.data;
};

export const deleteAsset = async (assetId) => {
  const response = await api.delete(`/assets/${assetId}`);
  return response.data;
};

// Beneficiary APIs
export const getBeneficiaries = async () => {
  const response = await api.get('/beneficiaries');
  return response.data;
};

export const createBeneficiary = async (name, email, relation) => {
  const response = await api.post('/beneficiaries', { name, email, relation });
  return response.data;
};

export const assignAsset = async (assetId, beneficiaryId) => {
  const response = await api.post('/beneficiaries/assign', { assetId, beneficiaryId });
  return response.data;
};

export const activateLegacy = async () => {
  const response = await api.post('/beneficiaries/activate-legacy');
  return response.data;
};

export const deleteBeneficiary = async (beneficiaryId) => {
  const response = await api.delete(`/beneficiaries/${beneficiaryId}`);
  return response.data;
};