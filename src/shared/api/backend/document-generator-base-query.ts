import {
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
	fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

import { ENV } from "@/shared/config";
import { serializeParams } from "@/shared/helpers";

export const documentGeneratorBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: ENV.VITE_DOCUMENT_API_URL,
		credentials: "include",
		paramsSerializer: serializeParams
	});

	return baseQuery(args, api, extraOptions);
};
