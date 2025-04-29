import axios from 'axios';

// const API_URL = 'https://ques-ai-phi.vercel.app/api/v1';
const API_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
});

api.interceptors.request.use(
  (config) => {
    // Get the persisted auth state from localStorage
    const authStorage = localStorage.getItem('auth-storage');
    let token = null;
    
    if (authStorage) {
      try {
        const authState = JSON.parse(authStorage);
        token = authState.state?.token;
      } catch (e) {
        console.error('Error parsing auth storage', e);
      }
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear auth storage on 401
      localStorage.removeItem('auth-storage');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/signin', { email, password });
    return response.data;
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/logout');
    return response.data;
  },

  getUserProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
};

// Podcast services
export const podcastService = {
  getPodcasts: async () => {
    const response = await api.get('/podcast');
    return response.data;
  },
  
  createPodcast: async (title: string) => {
    const response = await api.post('/podcast', { title });
    return response.data;
  },
  
  getEpisodes: async (podcastId: string) => {
    const response = await api.get(`/podcast/${podcastId}/episode`);
    return response.data;
  },
  
  getAllEpisodes: async () => {
    const response = await api.get('/podcast/episodes');
    return response.data;
  },
};

// Episode services
export const episodeService = {
  createEpisode: async (podcastId: string, data: { title: string; transcript: string }) => {
    const response = await api.post(`/podcast/${podcastId}/episode`, data);
    return response.data;
  },
  
  updateEpisode: async (podcastId: string, episodeId: string, data: { title?: string; transcript?: string }) => {
    const response = await api.put(`/podcast/${podcastId}/episode/${episodeId}`, data);
    return response.data;
  },
};

export default api;
