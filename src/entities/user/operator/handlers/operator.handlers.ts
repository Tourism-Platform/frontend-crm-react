import { HttpResponse, delay, http } from "msw";

import { OPERATOR_PATHS } from "@/shared/api";
import { ENV } from "@/shared/config";

const BASE_URL = ENV.VITE_API_URL || "";

export const operatorHandlers = [
	http.post(
		`${BASE_URL}${OPERATOR_PATHS.createOperator.url}`,
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
	http.get(`${BASE_URL}/operator/:id`, async ({ params }) => {
		await delay(500);
		return HttpResponse.json(
			{
				id: params.id,
				name: "Mock Operator"
			},
			{ status: 200 }
		);
	}),
	http.patch(`${BASE_URL}/operator/:id`, async () => {
		await delay(500);
		return new HttpResponse(null, { status: 204 });
	}),
	http.delete(`${BASE_URL}/operator/:id`, async () => {
		await delay(500);
		return new HttpResponse(null, { status: 204 });
	})
];
