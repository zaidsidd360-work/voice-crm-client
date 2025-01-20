import axiosInstance from "../services/axiosConfig";

export const createApiKey = async (data: {
	name: string;
	key: string;
	userId: string;
}) => {
	const response = await axiosInstance.post("/keys", data);
	return response.data;
};

export const getApiKeys = async (userId: string) => {
	const response = await axiosInstance.get("/keys/" + userId);
	return response.data;
};
