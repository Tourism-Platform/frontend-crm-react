import { HttpResponse, delay, http } from "msw";

import { OPERATOR_PATHS } from "@/shared/api";
import { ENV } from "@/shared/config";

const BASE_URL = ENV.VITE_API_URL || "";

const OPERATOR_ID_UUID =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isOperatorEntityId = (id: string) => OPERATOR_ID_UUID.test(id);

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
		const id = String(params.id);
		if (!isOperatorEntityId(id)) {
			return new HttpResponse(null, { status: 404 });
		}

		await delay(500);
		return HttpResponse.json(
			{
				id,
				name: "Mock Operator"
			},
			{ status: 200 }
		);
	}),
	http.patch(`${BASE_URL}/operator/:id`, async ({ params }) => {
		if (!isOperatorEntityId(String(params.id))) {
			return new HttpResponse(null, { status: 404 });
		}

		await delay(500);
		return new HttpResponse(null, { status: 204 });
	}),
	http.delete(`${BASE_URL}/operator/:id`, async ({ params }) => {
		if (!isOperatorEntityId(String(params.id))) {
			return new HttpResponse(null, { status: 404 });
		}

		await delay(500);
		return new HttpResponse(null, { status: 204 });
	})
];
