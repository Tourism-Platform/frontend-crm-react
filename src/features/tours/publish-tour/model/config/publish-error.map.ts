import {
	ENUM_PUBLISH_ERROR_CODE,
	type ENUM_PUBLISH_ERROR_CODE_TYPE
} from "../types/publish-error.types";

/**
 * Temporary bridge until backend sends stable `code`.
 * Keys are exact `detail` strings from the API.
 */
export const PUBLISH_ERROR_DETAIL_TO_CODE: Record<
	string,
	ENUM_PUBLISH_ERROR_CODE_TYPE
> = {
	"At least one fixed date or recurrence rule must be set before publishing":
		ENUM_PUBLISH_ERROR_CODE.SCHEDULE_REQUIRED
};

export const PUBLISH_ERROR_CODE_SET = new Set<string>(
	Object.values(ENUM_PUBLISH_ERROR_CODE)
);
