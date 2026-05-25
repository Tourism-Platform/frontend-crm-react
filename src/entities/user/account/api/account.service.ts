import { AUTH_PATHS, ENUM_API_TAGS, PROFILE_INFO_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapAccountToBackend,
	mapAccountToFrontend,
	mapPasswordChangeToBackend
} from "../converters";
import type { TAccountBackend, TChangePasswordSchema } from "../types";
import type { TAccountSchema } from "../types";

export const accountApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getAccount: builder.query<TAccountSchema, void>({
			query: () => ({
				...PROFILE_INFO_PATHS.getMyAccount
			}),
			transformResponse: (response: TAccountBackend) =>
				mapAccountToFrontend(response),
			providesTags: [ENUM_API_TAGS.USER]
		}),
		updateAccount: builder.mutation<TAccountSchema, TAccountSchema>({
			query: (body) => ({
				...PROFILE_INFO_PATHS.updateMyProfile,
				body: mapAccountToBackend(body)
			}),
			transformResponse: (response: TAccountBackend) =>
				mapAccountToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.USER]
		}),
		uploadProfileImage: builder.mutation<TAccountSchema, File>({
			query: (file) => {
				const formData = new FormData();
				formData.append("file", file);
				return {
					...PROFILE_INFO_PATHS.uploadAvatar,
					body: formData
				};
			},
			transformResponse: (response: TAccountBackend) =>
				mapAccountToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.USER]
		}),
		deleteProfileImage: builder.mutation<void, void>({
			query: () => ({
				...PROFILE_INFO_PATHS.deleteAvatar
			}),
			invalidatesTags: [ENUM_API_TAGS.USER]
		}),
		changePassword: builder.mutation<void, TChangePasswordSchema>({
			query: (body) => ({
				...AUTH_PATHS.changePassword,
				body: mapPasswordChangeToBackend(body)
			})
		})
	})
});

export const {
	useGetAccountQuery,
	useUpdateAccountMutation,
	useChangePasswordMutation,
	useUploadProfileImageMutation,
	useDeleteProfileImageMutation
} = accountApi;
