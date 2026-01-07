import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { ACTIVITY_LOG_MOCK } from "../mock/activity-log.mock";

const BASE_URL = ENV.VITE_API_URL || "";

const activityLog = [...ACTIVITY_LOG_MOCK];

export const tourActivityLogHandlers = [
	http.get(`${BASE_URL}/tours/:tourId/activity-log`, async ({ request }) => {
		await delay(1000);
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 5;

		const start = 0;
		const end = page * limit;
		const pagedData = activityLog.slice(start, end);

		return HttpResponse.json(
			{
				data: pagedData,
				total: activityLog.length
			},
			{ status: 200 }
		);
	})
];
