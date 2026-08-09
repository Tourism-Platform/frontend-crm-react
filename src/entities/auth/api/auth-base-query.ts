import {
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
	fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

import { ENV } from "@/shared/config";
import { serializeParams } from "@/shared/helpers";

import { sessionExpired } from "@/entities/auth/model/session-expired.action";

export const authBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: ENV.VITE_API_URL,
		credentials: "include",
		paramsSerializer: serializeParams
	});

	const result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		api.dispatch(sessionExpired());
	}

	return result;
};
