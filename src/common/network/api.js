import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BASE_URL from './env';

const axiosInstance = axios.create({ baseURL: BASE_URL });
Vue.use(VueAxios, axiosInstance);

const api = Vue.axios;

// eslint-disable-next-line import/prefer-default-export
export const getStories = (page, size) => api.get(`/api/hero-story?page=${page}&size=${size}`);
