import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { COMMISSIONS_MOCK } from "../mock";
import type { ICommissionBackend } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

let commissions = [...COMMISSIONS_MOCK] as ICommissionBackend[];

export const commissionHandlers = [
	http.get(`${BASE_URL}/commissions`, async () => {
		await delay(500);
		return HttpResponse.json(commissions, { status: 200 });
	}),

	http.post(`${BASE_URL}/commissions`, async ({ request }) => {
		await delay(1000);
		const body = (await request.json()) as Partial<ICommissionBackend>;
		const newCommission: ICommissionBackend = {
			...body,
			id: (commissions.length + 1).toString(),
			name: body.name || commissions[0]?.name,
			rate: body.rate || 0
		} as ICommissionBackend;
		commissions.push(newCommission);
		return HttpResponse.json(newCommission, { status: 201 });
	}),

	http.patch(`${BASE_URL}/commissions/:id`, async ({ params, request }) => {
		await delay(1000);
		const { id } = params;
		const body = (await request.json()) as Partial<ICommissionBackend>;
		const index = commissions.findIndex((c) => c.id === id);
		if (index !== -1) {
			commissions[index] = { ...commissions[index], ...body };
			return HttpResponse.json(commissions[index], { status: 200 });
		}
		return new HttpResponse(null, { status: 404 });
	}),

	http.delete(`${BASE_URL}/commissions/:id`, async ({ params }) => {
		await delay(500);
		const { id } = params;
		commissions = commissions.filter((c) => c.id !== id);
		return new HttpResponse(null, { status: 204 });
	})
];
