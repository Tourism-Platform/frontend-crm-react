import type { AgencyModel, CreateAgencySchema } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const AGENCY_PATHS = {
	createAgency: {
		url: "/agency/create",
		method: "POST",
		_types: {} as {
			body: CreateAgencySchema;
			query: void;
			response: AgencyModel;
		}
	} as const
} as const;
