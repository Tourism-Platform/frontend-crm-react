import { AUTH_PATHS } from "@/shared/api";
import { ENV } from "@/shared/config";

/** Полный URL старта OAuth-логина через Google (редирект браузера, не RTK-запрос) */
export const getGoogleLoginUrl = (): string => {
	const baseUrl = (ENV.VITE_API_URL ?? "").replace(/\/$/, "");
	return `${baseUrl}${AUTH_PATHS.googleLogin.url}`;
};
