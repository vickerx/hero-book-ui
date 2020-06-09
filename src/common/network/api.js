import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BASE_URL from './env';

const axiosInstance = axios.create({ baseURL: BASE_URL });
Vue.use(VueAxios, axiosInstance);

const api = Vue.axios;

// moved after gateway used
const GATEWAY = '/api';
const CORE_URL = `${GATEWAY}/storyservice`;
const AUTH_URL = `${GATEWAY}/authservice`;


export const getStories = (page, size) => api.get(`${CORE_URL}/hero-story?page=${page}&size=${size}`);

export const registerUser = (userInfo) => api.post(`${AUTH_URL}/user/registration`, null, { params: userInfo });

export const activeUser = (code) => api.get(`${AUTH_URL}/user/activate`, { params: { code } });

export const login = (email, password) => api.post(`${GATEWAY}/login?email=${email}&password=${password}`);

export const logout = () => api.post(`${GATEWAY}/logout`);
