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

interface AirtableFieldOptions {
	isReversed?: boolean;
	inverseLinkFieldId?: string;
	linkedTableId?: string;
	prefersSingleRecordLink?: boolean;
}

interface AirtableField {
	id: string;
	name: string;
	type: string;
	description?: string;
	options?: AirtableFieldOptions;
}

interface AirtableView {
	id: string;
	name: string;
	type: string;
}

interface AirtableTable {
	id: string;
	name: string;
	description?: string;
	fields: AirtableField[];
	primaryFieldId: string;
	views: AirtableView[];
}

interface AirtableTablesResponse {
	tables: AirtableTable[];
}

export const getAirtableTables = async (
	baseId: string
): Promise<AirtableTablesResponse> => {
	const response = await axios.get(
		`https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
		{
			headers: {
				Authorization: `Bearer patu3bTCvjKcj1dAH.14bdd086d57abbd25e028e8225211f1aca60f9ce95e0ce0526a47d19a4522379`,
			},
		}
	);
	return response.data;
};
