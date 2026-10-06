import {
	ENUM_COPY_EVENT_ERROR_CODE,
	type ENUM_COPY_EVENT_ERROR_CODE_TYPE
} from "./types";

/** Backend `detail` texts of the three copy routes (contract fe6.3). */
export const COPY_EVENT_ERROR_DETAIL_TO_CODE: Record<
	string,
	ENUM_COPY_EVENT_ERROR_CODE_TYPE
> = {
	"Not found": ENUM_COPY_EVENT_ERROR_CODE.NOT_FOUND,
	"Library event not found": ENUM_COPY_EVENT_ERROR_CODE.NOT_FOUND,
	"Tour option not found for this tour": ENUM_COPY_EVENT_ERROR_CODE.NOT_FOUND,
	"Event option not found": ENUM_COPY_EVENT_ERROR_CODE.NOT_FOUND,
	"No such event on the booked tour option":
		ENUM_COPY_EVENT_ERROR_CODE.NOT_FOUND,
	"No such event in this booking's snapshot":
		ENUM_COPY_EVENT_ERROR_CODE.NOT_FOUND,
	"Archived tours are immutable; nothing related to the tour can change":
		ENUM_COPY_EVENT_ERROR_CODE.ARCHIVED_TOUR,
	"Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages":
		ENUM_COPY_EVENT_ERROR_CODE.GUIDE_LANGUAGES,
	"Events can only be revised while the booking is in processing":
		ENUM_COPY_EVENT_ERROR_CODE.BOOKING_NOT_PROCESSING,
	"Booking has no snapshot to revise":
		ENUM_COPY_EVENT_ERROR_CODE.BOOKING_NOT_PROCESSING,
	"Authorization failed. Missing required permission.":
		ENUM_COPY_EVENT_ERROR_CODE.NO_PERMISSION
};
