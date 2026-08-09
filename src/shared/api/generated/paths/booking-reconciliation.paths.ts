import type { BookingReconciliationListResponse, BookingStatus } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_RECONCILIATION_PATHS = {
	listBookingReconciliation: {
		url: "/booking/reconciliation",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				status?: BookingStatus | null;
				tour_id?: string | null;
				date_from?: string | null;
				date_to?: string | null;
				outstanding_only?: boolean;
				payable_only?: boolean;
				q?: string | null;
				skip?: number;
				limit?: number;
			};
			response: BookingReconciliationListResponse;
		}
	} as const
} as const;
