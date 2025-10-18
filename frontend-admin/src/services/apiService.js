import axios from "axios";
export const API_BASE_URL = "http://localhost:8080";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const songsAPI = {
    add: (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return apiClient.post('/api/songs', formData, config);
    },
    list: () => apiClient.get('/api/songs'),
    remove: (id) => apiClient.delete(`/api/songs/${id}`)
};

export const albumsAPI = {
    add: (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        };
        return apiClient.post('/api/albums', formData, config);
    },
    list: () => apiClient.get('/api/albums'),
    remove: (id) => apiClient.delete(`/api/albums/${id}`)
};

export default apiClient;