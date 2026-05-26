import { HttpResponse, delay, http } from "msw";

import { AGENCY_PATHS } from "@/shared/api";
import { ENV } from "@/shared/config";

const BASE_URL = ENV.VITE_API_URL || "";

export const agencyHandlers = [
	http.post(
		`${BASE_URL}${AGENCY_PATHS.createAgency.url}`,
		async ({ request }) => {
			await delay(500);
			const body = (await request.json()) as { name: string };
			return HttpResponse.json(
				{
					id: crypto.randomUUID(),
					name: body.name
				},
				{ status: 201 }
			);
		}
	),
	http.get(`${BASE_URL}${AGENCY_PATHS.listAgencyCatalog.url}`, async () => {
		await delay(500);
		return HttpResponse.json([], { status: 200 });
	})
];
