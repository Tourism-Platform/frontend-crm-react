import { getApiErrorCode, getApiErrorDetail } from "@/shared/api";

import {
	PUBLISH_ERROR_CODE_SET,
	PUBLISH_ERROR_DETAIL_TO_CODE
} from "../config/publish-error.map";
import type { ENUM_PUBLISH_ERROR_CODE_TYPE } from "../types/publish-error.types";

function asKnownPublishCode(
	value: string | null
): ENUM_PUBLISH_ERROR_CODE_TYPE | null {
	if (!value || !PUBLISH_ERROR_CODE_SET.has(value)) {
		return null;
	}
	return value as ENUM_PUBLISH_ERROR_CODE_TYPE;
}

/**
 * Resolves a publish error to a known app code.
 * Prefer backend `code` when present; fall back to detail-string map.
 */
export function resolvePublishErrorCode(
	error: unknown
): ENUM_PUBLISH_ERROR_CODE_TYPE | null {
	const fromCode = asKnownPublishCode(getApiErrorCode(error));
	if (fromCode) {
		return fromCode;
	}

	const detail = getApiErrorDetail(error);
	if (!detail) {
		return null;
	}

	return PUBLISH_ERROR_DETAIL_TO_CODE[detail] ?? null;
}
