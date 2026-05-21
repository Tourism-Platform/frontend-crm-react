import type { IPreviewBookingSubmitBackendResponse } from "../types";

export const PREVIEW_BOOKING_SUCCESS_MOCK: IPreviewBookingSubmitBackendResponse =
	{
		booking_id: "RQA-20037552",
		status: "submitted",
		created_at: new Date().toISOString()
	};
