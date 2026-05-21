import { authApi } from "@/entities/auth/api/auth.api";

import type {
	IPreviewBookingSubmitBackendResponse,
	TPreviewBookingSchema
} from "../types";

export const tourPreviewBookingApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		submitPreviewBooking: builder.mutation<
			IPreviewBookingSubmitBackendResponse,
			{ tourId: string; data: TPreviewBookingSchema }
		>({
			query: ({ tourId, data }) => ({
				// Заглушка API-эндпоинта
				url: `/api/v1/tours/${tourId}/booking/submit`,
				method: "POST",
				body: data
			})
		})
	})
});

export const { useSubmitPreviewBookingMutation } = tourPreviewBookingApi;
