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
