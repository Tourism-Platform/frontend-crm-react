import { HttpResponse, http } from "msw";

import { TOUR_LANDING_MOCK } from "../mock/landing.mock";

export const tourLandingHandlers = [
	http.get("*/tours/:tourId/landing", () => {
		return HttpResponse.json(TOUR_LANDING_MOCK);
	}),

	http.patch("*/tours/:tourId/landing", async ({ request }) => {
		const data = await request.json();
		console.log("Update Landing:", data);
		return HttpResponse.json(data);
	})
];
