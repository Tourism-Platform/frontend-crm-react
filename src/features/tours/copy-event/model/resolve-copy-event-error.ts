import { getApiErrorDetail } from "@/shared/api";

import { COPY_EVENT_ERROR_DETAIL_TO_CODE } from "./copy-event-error.map";
import {
	ENUM_COPY_EVENT_ERROR_CODE,
	type ENUM_COPY_EVENT_ERROR_CODE_TYPE
} from "./types";

type TCopyEventToastFallbackKey = "copy.toasts.revision_duplicate.error";

type TCopyEventErrorMessageKey =
	| "copy.errors.NOT_FOUND"
	| "copy.errors.ARCHIVED_TOUR"
	| "copy.errors.GUIDE_LANGUAGES"
	| "copy.errors.BOOKING_NOT_PROCESSING"
	| "copy.errors.NO_PERMISSION"
	| TCopyEventToastFallbackKey;

export const resolveCopyEventErrorCode = (
	error: unknown
): ENUM_COPY_EVENT_ERROR_CODE_TYPE | null => {
	const detail = getApiErrorDetail(error);
	if (!detail) {
		return null;
	}

	return COPY_EVENT_ERROR_DETAIL_TO_CODE[detail] ?? null;
};

/** Returns a `common_events` i18n key — call site does `t(key)`. */
export const resolveCopyEventErrorMessage = (
	error: unknown,
	fallbackKey: TCopyEventToastFallbackKey
): TCopyEventErrorMessageKey => {
	const code = resolveCopyEventErrorCode(error);

	switch (code) {
		case ENUM_COPY_EVENT_ERROR_CODE.NOT_FOUND:
			return "copy.errors.NOT_FOUND";
		case ENUM_COPY_EVENT_ERROR_CODE.ARCHIVED_TOUR:
			return "copy.errors.ARCHIVED_TOUR";
		case ENUM_COPY_EVENT_ERROR_CODE.GUIDE_LANGUAGES:
			return "copy.errors.GUIDE_LANGUAGES";
		case ENUM_COPY_EVENT_ERROR_CODE.BOOKING_NOT_PROCESSING:
			return "copy.errors.BOOKING_NOT_PROCESSING";
		case ENUM_COPY_EVENT_ERROR_CODE.NO_PERMISSION:
			return "copy.errors.NO_PERMISSION";
		default:
			return fallbackKey;
	}
};
