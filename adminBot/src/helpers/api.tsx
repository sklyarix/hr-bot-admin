import axios from "axios";
//import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_URL_BACKEND;

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-source": "client-web",
  },
});

/*
instance.interceptors.request.use(
	config => {
		const token = Cookies.get('token')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
 */
