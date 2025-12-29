import { baseApi } from "@/shared/api";

import { mapAccountToBackend, mapAccountToFrontend } from "../converters";
import type { IAccountBackend } from "../types";
import type { TAccountSchema } from "../types";

export const accountApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAccount: builder.query<TAccountSchema, void>({
			query: () => "/user/account",
			transformResponse: (response: IAccountBackend) =>
				mapAccountToFrontend(response),
			providesTags: ["User"]
		}),
		updateAccount: builder.mutation<TAccountSchema, TAccountSchema>({
			query: (patch) => ({
				url: "/user/account",
				method: "PATCH",
				body: mapAccountToBackend(patch)
			}),
			transformResponse: (response: IAccountBackend) =>
				mapAccountToFrontend(response),
			invalidatesTags: ["User"]
		})
	})
});

export const { useGetAccountQuery, useUpdateAccountMutation } = accountApi;
