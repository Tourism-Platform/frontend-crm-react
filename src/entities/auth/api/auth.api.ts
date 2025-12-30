import { createApi } from "@reduxjs/toolkit/query/react";

import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";

import { authBaseQuery } from "./auth-base-query";

export const authApi = createApi({
	baseQuery: authBaseQuery,
	reducerPath: "authApi",
	endpoints: () => ({}),
	tagTypes: [
		ENUM_API_TAGS.USER,
		ENUM_API_TAGS.BUSINESS,
		ENUM_API_TAGS.STAFF,
		ENUM_API_TAGS.COMMISSION,
		ENUM_API_TAGS.TOURS
	]
});
