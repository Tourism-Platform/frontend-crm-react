import type {
	FetchArgs,
	FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";

import { AUTH_PATHS, ENUM_API_TAGS, baseApi } from "@/shared/api";
import { hasPlatformAccessRole } from "@/shared/config";

import { login } from "@/entities/user";

import { AUTH_ACCESS_DENIED_CODE } from "../constants";
import { mapAuthAccountToFrontend, mapAuthUserToBackend } from "../converters";
import { resetAllApiState } from "../lib/reset-api-state";
import type { IAuthAccount, IAuthUser, TAuthAccountBackend } from "../types";

type TAuthBaseQueryResult = { data?: unknown; error?: FetchBaseQueryError };
type TAuthBaseQuery = (
	args: FetchArgs
) => TAuthBaseQueryResult | PromiseLike<TAuthBaseQueryResult>;

const ACCESS_DENIED_ERROR: FetchBaseQueryError = {
	status: 403,
	data: { code: AUTH_ACCESS_DENIED_CODE }
};

/**
 * /auth/me. Аккаунт есть, только если роль операторская или агентская;
 * иначе — сразу signout и ошибка «нет доступа»
 */
const fetchAuthAccount = async (
	baseQuery: TAuthBaseQuery
): Promise<{ data: IAuthAccount } | { error: FetchBaseQueryError }> => {
	const accountResult = await baseQuery({ ...AUTH_PATHS.getMyAccount });
	if (accountResult.error) {
		return { error: accountResult.error };
	}

	const account = mapAuthAccountToFrontend(
		accountResult.data as TAuthAccountBackend
	);

	if (!hasPlatformAccessRole(account.role)) {
		await baseQuery({ ...AUTH_PATHS.logoutUser });
		return { error: ACCESS_DENIED_ERROR };
	}

	return { data: account };
};

export const AuthService = baseApi.injectEndpoints({
	endpoints: (build) => ({
		/** Успех — только после /auth/me с подходящей ролью: кнопка крутится до конца */
		signIn: build.mutation<IAuthAccount, IAuthUser>({
			async queryFn(body, _api, _extraOptions, baseQuery) {
				const loginResult = await baseQuery({
					...AUTH_PATHS.authUser,
					body: mapAuthUserToBackend(body)
				});
				if (loginResult.error) {
					return { error: loginResult.error };
				}

				return fetchAuthAccount(baseQuery);
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const { data: account } = await queryFulfilled;
				resetAllApiState(dispatch);
				// Аккаунт уже получен — ProtectedRoute редиректит сразу, без повторного /me
				dispatch(
					AuthService.util.upsertQueryData(
						"getAuthAccount",
						undefined,
						account
					)
				);
				dispatch(login());
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
				resetAllApiState(dispatch);
			}
		}),
		/** Восстановление сессии: /auth/me, без операторской/агентской роли — signout */
		getAuthAccount: build.query<IAuthAccount, void>({
			queryFn: (_arg, _api, _extraOptions, baseQuery) =>
				fetchAuthAccount(baseQuery),
			providesTags: [ENUM_API_TAGS.AUTH_ACCOUNT],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(login());
				} catch {
					// 401 обрабатывается через sessionExpired listener
				}
			}
		})
	})
});

export const { useSignInMutation, useSignOutMutation, useGetAuthAccountQuery } =
	AuthService;

/** Читает закэшированный аккаунт без подписки — не инициирует запрос /me */
export const useAuthAccountState =
	AuthService.endpoints.getAuthAccount.useQueryState;
