import axiosInstance from "../services/axiosConfig";

export const getVapiTools = async (vapitoken: string) => {
	const response = await axiosInstance.get("/vapi/tools/" + vapitoken);
	return response.data;
};
