import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { type IAuthUser } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

export const authHandlers = [
	http.post(`${BASE_URL}/auth/signin`, async ({ request }) => {
		await delay(500);
		const body = (await request.json()) as IAuthUser;

		if (body.email === "client" && body.password === "client") {
			return HttpResponse.json("mock-jwt-token", { status: 200 });
		}

		return new HttpResponse(null, {
			status: 401,
			statusText: "Unauthorized"
		});
	}),
	http.post(`${BASE_URL}/auth/signup`, async ({ request }) => {
		await delay(500);
		const body = (await request.json()) as IAuthUser;

		if (body.email === "client") {
			return new HttpResponse(null, {
				status: 409,
				statusText: "Conflict"
			});
		}

		return HttpResponse.json({ email: body.email }, { status: 200 });
	})
];
