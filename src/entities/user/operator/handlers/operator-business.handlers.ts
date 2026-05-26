import { HttpResponse, delay, http } from "msw";

import { OPERATOR_PATHS } from "@/shared/api";
import { ENV } from "@/shared/config";

import { OPERATOR_BUSINESS_MOCK } from "../mock";
import type { TOperatorBusinessInfoUpdateBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

let operatorInfoStore = { ...OPERATOR_BUSINESS_MOCK };

export const operatorBusinessHandlers = [
	http.get(`${BASE_URL}${OPERATOR_PATHS.getOperatorInfo.url}`, async () => {
		await delay(500);
		return HttpResponse.json(operatorInfoStore, { status: 200 });
	}),
	http.patch(
		`${BASE_URL}${OPERATOR_PATHS.updateOperatorInfo.url}`,
		async ({ request }) => {
			await delay(500);
			const body =
				(await request.json()) as TOperatorBusinessInfoUpdateBackend;
			operatorInfoStore = {
				...operatorInfoStore,
				...body
			};
			return HttpResponse.json(operatorInfoStore, { status: 200 });
		}
	),
	http.post(
		`${BASE_URL}${OPERATOR_PATHS.addLogo.url}`,
		async ({ request }) => {
			await delay(500);
			const formData = await request.formData();
			const file = formData.get("file");
			const logoUrl =
				file instanceof File
					? URL.createObjectURL(file)
					: operatorInfoStore.logo_url;
			operatorInfoStore = {
				...operatorInfoStore,
				logo_url: logoUrl
			};
			return HttpResponse.json(operatorInfoStore, { status: 200 });
		}
	),
	http.delete(`${BASE_URL}${OPERATOR_PATHS.deleteLogo.url}`, async () => {
		await delay(500);
		operatorInfoStore = {
			...operatorInfoStore,
			logo_url: null
		};
		return new HttpResponse(null, { status: 204 });
	})
];
