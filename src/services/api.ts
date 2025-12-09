/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = 'https://be-link-generator.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },
  
  signin: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/signin', data);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Get current user (me)
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// QR Code API
export const qrCodeAPI = {
  // Get all QR codes for current user
  getAll: async () => {
    const response = await api.get('/qrcodes');
    return response.data;
  },

  // Get single QR code
  getOne: async (id: string) => {
    const response = await api.get(`/qrcodes/${id}`);
    return response.data;
  },

  // Create new QR code
  create: async (data: {
    type: 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'upi';
    data: string;
    title: string;
    customization?: {
      qrColor: string;
      bgColor: string;
      qrSize: number;
      errorLevel: 'L' | 'M' | 'Q' | 'H';
      dotStyle: string;
      cornerSquareStyle: string;
      cornerDotStyle: string;
      logo: string | null;
      logoSize: number;
      logoPadding: number;
      removeBackground: boolean;
    };
  }) => {
    const response = await api.post('/qrcodes', data);
    return response.data;
  },

  // Update QR code
  update: async (id: string, data: any) => {
    const response = await api.put(`/qrcodes/${id}`, data);
    return response.data;
  },

  // Delete QR code
  delete: async (id: string) => {
    const response = await api.delete(`/qrcodes/${id}`);
    return response.data;
  },

  // Increment scan count
  incrementScan: async (id: string) => {
    const response = await api.post(`/qrcodes/${id}/scan`);
    return response.data;
  },

  // Get scans for a QR code
  getScans: async (id: string) => {
    const response = await api.get(`/qrcodes/${id}/scans`);
    return response.data;
  },

  // Get analytics for a QR code
  getAnalytics: async (id: string) => {
    const response = await api.get(`/qrcodes/${id}/analytics`);
    return response.data;
  },
  
  // Track scan (for redirect page)
  trackScan: async (id: string) => {
    const response = await api.post(`/qrcodes/${id}/scan`);
    return response.data;
  },
};

// Scans API
export const scansAPI = {
  // Get all scans for current user
  getAll: async () => {
    const response = await api.get('/scans');
    return response.data;
  },
  
  // Get scans by QR code ID
  getByQRCodeId: async (id: string) => {
    const response = await api.get(`/qrcodes/${id}/scans`);
    return response.data;
  },
};

export default api;
