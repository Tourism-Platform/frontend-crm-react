import { baseApi } from "@/shared/api";

import type { IAuthUser } from "../types";

export const AuthService = baseApi.injectEndpoints({
	endpoints: (build) => ({
		signUp: build.mutation<{ email: string }, IAuthUser>({
			query: (BodyParams) => ({
				url: `/auth/signup`,
				method: `POST`,
				body: BodyParams
			})
		}),
		signIn: build.mutation<string, IAuthUser>({
			query: (BodyParams) => ({
				url: `/auth/signin`,
				method: `POST`,
				body: BodyParams
			})
		}),
		signOut: build.mutation<string, void>({
			query: () => ({
				url: `/auth/signout`,
				method: `POST`
			})
		})
	})
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } =
	AuthService;
