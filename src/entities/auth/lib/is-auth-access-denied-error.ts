import { getApiErrorCode } from "@/shared/api";

import { AUTH_ACCESS_DENIED_CODE } from "../constants";

export const isAuthAccessDeniedError = (error: unknown): boolean =>
	getApiErrorCode(error) === AUTH_ACCESS_DENIED_CODE;
