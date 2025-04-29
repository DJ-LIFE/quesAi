import axios from 'axios';
const API_URL = 'http://localhost:3000/api/v1';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

//services
export const authService = {
    login: async (email: string, password: string) => {
        const response = await api.post('/signin', {email, password});
        return response.data;
    },

    signup: async (name: string, email: string, password: string) => {
        const response = await api.post('/signup', {name, email, password});
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },

    getUserProfile: async () => {
        const response = await api.get('/profile');
        return response.data;
    }
};

export default api;
