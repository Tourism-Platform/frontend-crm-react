import type { AUTH_PATHS } from "@/shared/api";

export type TAuthUserBackend = typeof AUTH_PATHS.authUser._types.body;

export type TAuthAccountBackend =
	typeof AUTH_PATHS.getMyAccount._types.response;
