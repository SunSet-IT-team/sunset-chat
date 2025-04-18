import axios from 'axios';
import {СhatApiMethods} from './types';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_CHAT_URL || 'http://localhost:3000'}/api`,
    timeout: 10000, // Таймаут запроса
    headers: {
        'Content-Type': 'application/json',
    },
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

export default api;

/**
 * API для работы с чатом
 */
export const chatApi: СhatApiMethods = {
    getChatMessages: (chatId, params) => {
        const page = params.page || 1;
        const limit = params.limit || 20;

        const res = api.get(
            `/chat/${chatId}/messages?page=${page}&limit=${limit}`
        );

        return res;
    },

    getFile: (filename: string) => {
        const res = api.get(`/api/files/${filename}`);

        return res;
    },
};
