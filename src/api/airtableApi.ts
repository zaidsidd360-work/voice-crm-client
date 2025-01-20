import axios from "axios";

interface AirtableBase {
	id: string;
	name: string;
	permissionLevel: string;
}

interface AirtableResponse {
	bases: AirtableBase[];
}

export const getAirtableBases = async (
	token: string
): Promise<AirtableResponse> => {
	const response = await axios.get("https://api.airtable.com/v0/meta/bases", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
};
