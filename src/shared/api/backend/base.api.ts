import {
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
	createApi,
	fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

import { AUTH_PATHS } from "@/shared/api/generated/paths/auth.paths";
import { ENV } from "@/shared/config";
import { serializeParams } from "@/shared/helpers";

import { sessionExpired } from "@/entities/auth/model/session-expired.action";

import { API_TAG_TYPES } from "./tags.config";

const SESSION_EXPIRED_401_URLS = new Set<string>([
	AUTH_PATHS.getMyAccount.url,
	AUTH_PATHS.logoutUser.url
]);

const getRequestUrl = (args: string | FetchArgs): string =>
	typeof args === "string" ? args : args.url;

const rawBaseQuery = fetchBaseQuery({
	baseUrl: ENV.VITE_API_URL,
	credentials: "include",
	paramsSerializer: serializeParams
});

const baseQueryWithAuthGuard: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await rawBaseQuery(args, api, extraOptions);

	if (
		result.error?.status === 401 &&
		SESSION_EXPIRED_401_URLS.has(getRequestUrl(args))
	) {
		api.dispatch(sessionExpired());
	}

	return result;
};

export const baseApi = createApi({
	baseQuery: baseQueryWithAuthGuard,
	reducerPath: "baseApi",
	endpoints: () => ({}),
	tagTypes: API_TAG_TYPES
});
