import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ENV } from "@/shared/config";

import { ENUM_API_TAGS } from "./tags.config";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: ENV.VITE_API_URL,
		credentials: "include"
	}),
	reducerPath: "baseApi",
	endpoints: () => ({}),
	tagTypes: [ENUM_API_TAGS.USER]
});
