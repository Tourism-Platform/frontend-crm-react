import { ORDER_TOUR_ID_FALLBACK } from "../constants/order-tour-id.constants";

const getPreviewBookingDraftKey = (orderId: string) =>
	`preview-booking-${orderId}`;

interface IPreviewBookingDraft {
	tourId?: string;
	option_id?: string;
}

const getTourIdFromDraft = (
	orderId: string,
	tourOptionId: string
): string | undefined => {
	try {
		const raw = localStorage.getItem(getPreviewBookingDraftKey(orderId));
		if (!raw) return undefined;

		const draft = JSON.parse(raw) as IPreviewBookingDraft;
		if (!draft.tourId) return undefined;

		if (draft.option_id && draft.option_id !== tourOptionId) {
			return undefined;
		}

		return draft.tourId;
	} catch {
		return undefined;
	}
};

export const resolveOrderTourId = (
	orderId: string,
	tourOptionId: string,
	tourIdFromQuery?: string | null
): string =>
	tourIdFromQuery ||
	getTourIdFromDraft(orderId, tourOptionId) ||
	ORDER_TOUR_ID_FALLBACK;
