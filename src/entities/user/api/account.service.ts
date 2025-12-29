import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAccountToBackend,
	mapAccountToFrontend,
	mapPasswordChangeToBackend
} from "../converters";
import type { IAccountBackend, TChangePasswordSchema } from "../types";
import type { TAccountSchema } from "../types";

export const accountApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getAccount: builder.query<TAccountSchema, void>({
			query: () => "/user/account",
			transformResponse: (response: IAccountBackend) =>
				mapAccountToFrontend(response),
			providesTags: [ENUM_API_TAGS.USER]
		}),
		updateAccount: builder.mutation<TAccountSchema, TAccountSchema>({
			query: (patch) => ({
				url: "/user/account",
				method: "PATCH",
				body: mapAccountToBackend(patch)
			}),
			transformResponse: (response: IAccountBackend) =>
				mapAccountToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.USER]
		}),
		changePassword: builder.mutation<void, TChangePasswordSchema>({
			query: (passwords) => ({
				url: "/user/change-password",
				method: "POST",
				body: mapPasswordChangeToBackend(passwords)
			})
		})
	})
});

export const {
	useGetAccountQuery,
	useUpdateAccountMutation,
	useChangePasswordMutation
} = accountApi;
