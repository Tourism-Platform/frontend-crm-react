import {
	ENUM_PREVIEW_OPTION_EVENT,
	type TPreviewOptionEventType
} from "../types/preview-option-event.types";

export const mapPreviewBackendTypToEventType = (
	typ: string | undefined
): TPreviewOptionEventType => {
	switch (typ) {
		case "1":
			return ENUM_PREVIEW_OPTION_EVENT.FLIGHT;
		case "2":
		case "3":
		case "4":
			return ENUM_PREVIEW_OPTION_EVENT.TRANSPORTATION;
		case "5":
			return ENUM_PREVIEW_OPTION_EVENT.ACCOMMODATION;
		case "6":
			return ENUM_PREVIEW_OPTION_EVENT.ACTIVITY;
		case "7":
			return ENUM_PREVIEW_OPTION_EVENT.INFO;
		case "8":
			return ENUM_PREVIEW_OPTION_EVENT.MULTIPLY_OPTION;
		default:
			return ENUM_PREVIEW_OPTION_EVENT.INFO;
	}
};
