import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const loginUser = (data) => API.post('/auth/login', data);
export const signupUser = (data) => API.post('/auth/signup', data);