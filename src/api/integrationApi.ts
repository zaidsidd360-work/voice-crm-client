import axiosInstance from "../services/axiosConfig";

interface IntegrationData {
	userId: string;
	name: string;
	type: "airtable" | "gohighlevel";
	vapiToolId: string;
	airtableToken?: string;
	baseId?: string;
	tableId?: string;
	ghlApiKey?: string;
}

export const createIntegration = async (data: IntegrationData) => {
	console.log(data);
	const response = await axiosInstance.post("/integrations", data);
	return response.data;
};

export const getIntegrations = async (userId: string) => {
	const response = await axiosInstance.get("/integrations/" + userId);
	return response.data;
};

export const getIntegration = async (id: string) => {
	const response = await axiosInstance.get(`/integrations/${id}`);
	return response.data;
};

export const updateIntegration = async (
	id: string,
	data: Partial<IntegrationData>
) => {
	const response = await axiosInstance.patch(`/integrations/${id}`, data);
	return response.data;
};

export const deleteIntegration = async (id: string) => {
	const response = await axiosInstance.delete(`/integrations/${id}`);
	return response.data;
};
