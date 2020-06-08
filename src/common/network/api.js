import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BASE_URL from './env';

const axiosInstance = axios.create({ baseURL: BASE_URL });
Vue.use(VueAxios, axiosInstance);

const api = Vue.axios;

// moved after gateway used
const CORE_URL = 'http://localhost:8081';
const AUTH_URL = 'http://localhost:8083';

export const getStories = (page, size) => api.get(`${CORE_URL}/api/hero-story?page=${page}&size=${size}`);

export const registerUser = (userInfo) => api.post(`${AUTH_URL}/user/registration`, null, { params: userInfo });

export const activeUser = (code) => api.get(`${AUTH_URL}/user/activate`, { params: { code } });
