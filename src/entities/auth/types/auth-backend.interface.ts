import type { AUTH_PATHS, AuthUserIn } from "@/shared/api";

export type TAuthUserBackend = AuthUserIn;

export type TAuthAccountBackend =
	typeof AUTH_PATHS.getMyAccount._types.response;
