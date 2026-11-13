import { createApi } from "@reduxjs/toolkit/query/react";

import { API_TAG_TYPES } from "@/shared/api/backend/tags.config";

import { authBaseQuery } from "./auth-base-query";

export const authApi = createApi({
	baseQuery: authBaseQuery,
	reducerPath: "authApi",
	endpoints: () => ({}),
	tagTypes: API_TAG_TYPES
});
