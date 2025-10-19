import {
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
	fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

import { ENV } from "@/shared/config";

import { logout } from "@/entities/user";

export const authBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: ENV.VITE_API_URL,
		credentials: "include"
	});

	// Выполняем базовый запрос
	const result = await baseQuery(args, api, extraOptions);

	// Проверяем на 401 ошибку
	if (result.error && result.error.status === 401) {
		// Вызов логаута
		api.dispatch(logout());
		// api.dispatch(logoutEcp());
	}

	return result;
};
