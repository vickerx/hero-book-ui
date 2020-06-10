import axios from 'axios';

const GATEWAY = '/api';
const CORE_URL = `${GATEWAY}/storyservice`;
const AUTH_URL = `${GATEWAY}/authservice`;


export const getStories = (page, size) => axios.get(`${CORE_URL}/hero-story?page=${page}&size=${size}`);

export const registerUser = (userInfo) => axios.post(`${AUTH_URL}/user/registration`, null, { params: userInfo });

export const activeUser = (code) => axios.get(`${AUTH_URL}/user/activate`, { params: { code } });

export const login = (email, password) => axios.post(`${GATEWAY}/login?email=${email}&password=${password}`);

export const logout = () => axios.post(`${GATEWAY}/logout`);

export const getUserInfo = () => axios.get(`${AUTH_URL}/user/info`);

export const uploadImage = (image) => axios.put('api/storyservice/hero-story/image', image);
