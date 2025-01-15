// import axiosInstance from "../axiosConfig";

interface IntegrationData {
	userId: string;
	retellApiKey?: string;
	vapiApiKey?: string;
	airtableApiKey?: string;
	ghlApiKey?: string;
}

// export const createIntegration = (data: IntegrationData) => {
// 	return axiosInstance.post("/integration", data);
// };

// export const updateIntegration = (
// 	userId: string,
// 	data: Partial<IntegrationData>
// ) => {
// 	return axiosInstance.put(`/integration/${userId}`, data);
// };

// export const getIntegration = (userId: string) => {
// 	return axiosInstance.get(`/integration/${userId}`);
// };

import { dummyData } from "../dummyData";

export const createIntegration = async (data: Required<IntegrationData>) => {
	dummyData.push(data);
	return new Promise((resolve) => {
		setTimeout(
			() => resolve({ data: "Integration created successfully" }),
			500
		);
	});
};

export const updateIntegration = async (
	userId: string,
	data: Partial<IntegrationData>
) => {
	const index = dummyData.findIndex((item) => item.userId === userId);
	if (index !== -1) {
		dummyData[index] = { ...dummyData[index], ...data };
	}
	return new Promise((resolve) => {
		setTimeout(
			() => resolve({ data: "Integration updated successfully" }),
			500
		);
	});
};

export const getIntegration = async (userId: string) => {
	const integration = dummyData.find((item) => item.userId === userId);
	return new Promise((resolve) => {
		setTimeout(() => resolve({ data: { integration } }), 500);
	});
};
