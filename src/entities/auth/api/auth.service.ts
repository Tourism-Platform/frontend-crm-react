import { AUTH_PATHS, ENUM_API_TAGS, baseApi } from "@/shared/api";

import { mapAuthAccountToFrontend, mapAuthUserToBackend } from "../converters";
import type { IAuthUser, TAuthAccountBackend } from "../types";

export const AuthService = baseApi.injectEndpoints({
	endpoints: (build) => ({
		signIn: build.mutation<
			typeof AUTH_PATHS.authUser._types.response,
			IAuthUser
		>({
			query: (BodyParams) => ({
				...AUTH_PATHS.authUser,
				body: mapAuthUserToBackend(BodyParams)
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await queryFulfilled;
				dispatch(baseApi.util.resetApiState());
			}
		}),
		signOut: build.mutation<
			typeof AUTH_PATHS.logoutUser._types.response,
			void
		>({
			query: () => ({
				...AUTH_PATHS.logoutUser
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await queryFulfilled;
				dispatch(baseApi.util.resetApiState());
			}
		}),
		getAuthAccount: build.query<TAuthAccountBackend, void>({
			query: () => ({
				...AUTH_PATHS.getMyAccount
			}),
			transformResponse: (response: TAuthAccountBackend) =>
				mapAuthAccountToFrontend(response),
			providesTags: [ENUM_API_TAGS.AUTH_ACCOUNT]
		})
	})
});

export const { useSignInMutation, useSignOutMutation, useGetAuthAccountQuery } =
	AuthService;
