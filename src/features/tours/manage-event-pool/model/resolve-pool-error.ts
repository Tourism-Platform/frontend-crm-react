import { getApiErrorCode, getApiErrorDetail } from "@/shared/api";

import { POOL_ERROR_DETAIL_TO_CODE } from "./pool-error.map";
import { ENUM_POOL_ERROR_CODE, type ENUM_POOL_ERROR_CODE_TYPE } from "./types";

type TPoolToastFallbackKey =
	| "pool.toasts.add.error"
	| "pool.toasts.remove.error"
	| "pool.toasts.set_main.error";

type TPoolErrorMessageKey =
	| "pool.errors.POOL_MEMBER_NOT_FOUND"
	| "pool.errors.POOL_LAST_MEMBER"
	| "pool.errors.POOL_ECHO_MISMATCH"
	| "pool.errors.POOL_SUPPLY_MOVE"
	| "pool.errors.POOL_REQUIRED"
	| "pool.errors.POOL_TYP_MISMATCH"
	| "pool.errors.EVENT_OPTION_NOT_FOUND"
	| TPoolToastFallbackKey;

function asKnownPoolCode(
	value: string | null
): ENUM_POOL_ERROR_CODE_TYPE | null {
	switch (value) {
		case ENUM_POOL_ERROR_CODE.POOL_MEMBER_NOT_FOUND:
		case ENUM_POOL_ERROR_CODE.POOL_LAST_MEMBER:
		case ENUM_POOL_ERROR_CODE.POOL_ECHO_MISMATCH:
		case ENUM_POOL_ERROR_CODE.POOL_SUPPLY_MOVE:
		case ENUM_POOL_ERROR_CODE.POOL_REQUIRED:
		case ENUM_POOL_ERROR_CODE.POOL_TYP_MISMATCH:
		case ENUM_POOL_ERROR_CODE.EVENT_OPTION_NOT_FOUND:
			return value;
		default:
			return null;
	}
}

export const resolvePoolErrorCode = (
	error: unknown
): ENUM_POOL_ERROR_CODE_TYPE | null => {
	const fromCode = asKnownPoolCode(getApiErrorCode(error));
	if (fromCode) {
		return fromCode;
	}

	const detail = getApiErrorDetail(error);
	if (!detail) {
		return null;
	}

	return POOL_ERROR_DETAIL_TO_CODE[detail] ?? null;
};

/** Returns i18n key only — call site does `toast.error(t(key))`. */
export const resolvePoolErrorMessage = (
	error: unknown,
	fallbackKey: TPoolToastFallbackKey
): TPoolErrorMessageKey => {
	const code = resolvePoolErrorCode(error);

	switch (code) {
		case ENUM_POOL_ERROR_CODE.POOL_MEMBER_NOT_FOUND:
			return "pool.errors.POOL_MEMBER_NOT_FOUND";
		case ENUM_POOL_ERROR_CODE.POOL_LAST_MEMBER:
			return "pool.errors.POOL_LAST_MEMBER";
		case ENUM_POOL_ERROR_CODE.POOL_ECHO_MISMATCH:
			return "pool.errors.POOL_ECHO_MISMATCH";
		case ENUM_POOL_ERROR_CODE.POOL_SUPPLY_MOVE:
			return "pool.errors.POOL_SUPPLY_MOVE";
		case ENUM_POOL_ERROR_CODE.POOL_REQUIRED:
			return "pool.errors.POOL_REQUIRED";
		case ENUM_POOL_ERROR_CODE.POOL_TYP_MISMATCH:
			return "pool.errors.POOL_TYP_MISMATCH";
		case ENUM_POOL_ERROR_CODE.EVENT_OPTION_NOT_FOUND:
			return "pool.errors.EVENT_OPTION_NOT_FOUND";
		default:
			return fallbackKey;
	}
};
