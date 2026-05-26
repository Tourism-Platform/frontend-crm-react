import { HttpResponse, delay, http } from "msw";

import { AGENCY_PATHS } from "@/shared/api";
import { ENV } from "@/shared/config";

import { AGENCY_BUSINESS_MOCK } from "../mock";
import type { TAgencyBusinessInfoUpdateBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

let agencyInfoStore = { ...AGENCY_BUSINESS_MOCK };

export const agencyBusinessHandlers = [
	http.get(`${BASE_URL}${AGENCY_PATHS.getAgencyInfo.url}`, async () => {
		await delay(500);
		return HttpResponse.json(agencyInfoStore, { status: 200 });
	}),
	http.patch(
		`${BASE_URL}${AGENCY_PATHS.updateAgencyInfo.url}`,
		async ({ request }) => {
			await delay(500);
			const body =
				(await request.json()) as TAgencyBusinessInfoUpdateBackend;
			agencyInfoStore = {
				...agencyInfoStore,
				...body
			};
			return HttpResponse.json(agencyInfoStore, { status: 200 });
		}
	),
	http.post(
		`${BASE_URL}${AGENCY_PATHS.addAgencyLogo.url}`,
		async ({ request }) => {
			await delay(500);
			const formData = await request.formData();
			const file = formData.get("file");
			const logoUrl =
				file instanceof File
					? URL.createObjectURL(file)
					: agencyInfoStore.logo_url;
			agencyInfoStore = {
				...agencyInfoStore,
				logo_url: logoUrl
			};
			return HttpResponse.json(agencyInfoStore, { status: 200 });
		}
	),
	http.delete(`${BASE_URL}${AGENCY_PATHS.deleteAgencyLogo.url}`, async () => {
		await delay(500);
		agencyInfoStore = {
			...agencyInfoStore,
			logo_url: null
		};
		return new HttpResponse(null, { status: 204 });
	})
];
