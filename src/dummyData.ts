export interface IntegrationData {
	userId: string;
	retellApiKey: string;
	vapiApiKey?: string;
	airtableApiKey: string;
	ghlApiKey?: string;
}

export const dummyData: IntegrationData[] = Array.from(
	{ length: 5 },
	(_, i) => ({
		userId: `user${i + 1}`,
		retellApiKey: `retell-api-key-${i + 1}`,
		// vapiApiKey: `vapi-api-key-${i + 1}`,
		airtableApiKey: `airtable-api-key-${i + 1}`,
		// ghlApiKey: `ghl-api-key-${i + 1}`,
	})
);
