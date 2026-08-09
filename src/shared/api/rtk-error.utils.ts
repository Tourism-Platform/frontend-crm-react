import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
	error: unknown
): error is FetchBaseQueryError {
	return typeof error === "object" && error !== null && "status" in error;
}

export function getHttpErrorStatus(error: unknown): number | undefined {
	if (!isFetchBaseQueryError(error)) {
		return undefined;
	}

	return typeof error.status === "number" ? error.status : undefined;
}

export function isNotFoundError(error: unknown): boolean {
	return getHttpErrorStatus(error) === 404;
}

export function isUnauthorizedError(error: unknown): boolean {
	return getHttpErrorStatus(error) === 401;
}

function getErrorPayload(error: unknown): unknown {
	if (error == null || typeof error !== "object") {
		return error;
	}

	if (isFetchBaseQueryError(error) && "data" in error) {
		return error.data;
	}

	return error;
}

function asRecord(value: unknown): Record<string, unknown> | null {
	if (typeof value !== "object" || value === null) {
		return null;
	}
	return value as Record<string, unknown>;
}

/**
 * Reads a stable machine code from the API body when present (`code` field).
 */
export function getApiErrorCode(error: unknown): string | null {
	const payload = getErrorPayload(error);
	const record = asRecord(payload);
	if (!record) {
		return null;
	}

	if (typeof record.code === "string" && record.code.trim()) {
		return record.code.trim();
	}

	const detail = asRecord(record.detail);
	if (detail && typeof detail.code === "string" && detail.code.trim()) {
		return detail.code.trim();
	}

	return null;
}

function formatValidationItem(item: unknown): string | null {
	if (typeof item === "string") {
		return item;
	}
	if (typeof item !== "object" || item === null) {
		return null;
	}

	const record = item as Record<string, unknown>;
	const msg = typeof record.msg === "string" ? record.msg : null;
	if (!msg) {
		return null;
	}

	const loc = Array.isArray(record.loc)
		? record.loc.filter(
				(p) => typeof p === "string" || typeof p === "number"
			)
		: [];
	const path = loc.length > 0 ? loc.join(".") : null;
	return path ? `${path}: ${msg}` : msg;
}

/**
 * Extracts raw backend detail text for matching / logging — not for UI copy.
 */
export function getApiErrorDetail(error: unknown): string | null {
	if (error == null) {
		return null;
	}

	if (typeof error === "string" && error.trim()) {
		return error.trim();
	}

	if (typeof error !== "object") {
		return null;
	}

	const payload = getErrorPayload(error);

	if (typeof payload === "string" && payload.trim()) {
		return payload.trim();
	}

	const record = asRecord(payload);
	if (!record) {
		const serialized = error as SerializedError;
		return serialized.message?.trim() || null;
	}

	if ("detail" in record) {
		const detail = record.detail;

		if (typeof detail === "string" && detail.trim()) {
			return detail.trim();
		}

		if (Array.isArray(detail)) {
			const parts = detail
				.map(formatValidationItem)
				.filter((part): part is string => Boolean(part));
			if (parts.length > 0) {
				return parts.join("\n");
			}
		}

		if (typeof detail === "object" && detail !== null) {
			const nested = getApiErrorDetail(detail);
			if (nested) {
				return nested;
			}
		}
	}

	if (typeof record.message === "string" && record.message.trim()) {
		return record.message.trim();
	}

	const serialized = error as SerializedError;
	return serialized.message?.trim() || null;
}
