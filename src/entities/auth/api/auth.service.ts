import { AUTH_PATHS, baseApi } from "@/shared/api";

import { mapAuthUserToBackend } from "../converters";
import type { IAuthUser } from "../types";

export const AuthService = baseApi.injectEndpoints({
	endpoints: (build) => ({
		signUp: build.mutation<
			typeof AUTH_PATHS.registerUser._types.response,
			IAuthUser
		>({
			query: (BodyParams) => ({
				...AUTH_PATHS.registerUser,
				body: mapAuthUserToBackend(BodyParams)
			})
		}),
		signIn: build.mutation<
			typeof AUTH_PATHS.authUser._types.response,
			IAuthUser
		>({
			query: (BodyParams) => ({
				...AUTH_PATHS.authUser,
				body: mapAuthUserToBackend(BodyParams)
			})
		}),
		signOut: build.mutation<
			typeof AUTH_PATHS.logoutUser._types.response,
			void
		>({
			query: () => ({
				...AUTH_PATHS.logoutUser
			})
		})
	})
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } =
	AuthService;
