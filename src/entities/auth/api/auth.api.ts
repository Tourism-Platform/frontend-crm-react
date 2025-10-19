import { createApi } from "@reduxjs/toolkit/query/react";

import { authBaseQuery } from "./auth-base-query";

export const authApi = createApi({
	baseQuery: authBaseQuery,
	reducerPath: "authApi",
	endpoints: () => ({}),
	tagTypes: []
});
