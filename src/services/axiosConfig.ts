import axios from "axios";
import { getToken, setToken, clearToken } from "./authService";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const { data } = await axios.post(
					`${import.meta.env.VITE_API_URL}/auth/refresh-token`,
					{
						refreshToken: getToken("refreshToken"),
					}
				);
				setToken(data.accessToken, data.refreshToken);
				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
				return axios(originalRequest);
			} catch (err) {
				clearToken();
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
