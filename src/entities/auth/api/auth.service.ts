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
		signIn: build.mutation<{ email: string }, IAuthUser>({
			query: (BodyParams) => ({
				url: `/auth/signin`,
				method: `POST`,
				body: BodyParams
			})
		})
	})
});

export const { useSignUpMutation, useSignInMutation } = AuthService;
