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

import { ENUM_API_TAGS } from "./tags.config";

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
	tagTypes: [
		ENUM_API_TAGS.USER,
		ENUM_API_TAGS.AUTH_ACCOUNT,
		ENUM_API_TAGS.BUSINESS,
		ENUM_API_TAGS.COMMISSION,
		ENUM_API_TAGS.TOURS,
		ENUM_API_TAGS.FINANCE_RECONCILIATIONS,
		ENUM_API_TAGS.FINANCE_INVOICES,
		ENUM_API_TAGS.FINANCE_CLIENT_PAYMENTS,
		ENUM_API_TAGS.FINANCE_SUPPLIER_PAYMENTS,
		ENUM_API_TAGS.TOUR_ACTIVITY_LOG,
		ENUM_API_TAGS.BOOKING_ORDERS,
		ENUM_API_TAGS.TOURS_CATALOG,
		ENUM_API_TAGS.TOURS_EVENTS,
		ENUM_API_TAGS.EVENT_LIBRARY,
		ENUM_API_TAGS.LANDING_IMAGES,
		ENUM_API_TAGS.EVENT_IMAGES
	]
});
