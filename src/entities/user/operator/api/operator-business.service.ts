import { ENUM_API_TAGS, OPERATOR_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapOperatorBusinessInfoToBackend,
	mapOperatorBusinessInfoToFrontend
} from "../converters";
import type {
	TOperatorBusinessInfoBackend,
	TOperatorBusinessSchema
} from "../types";

export const operatorBusinessApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		createOperatorBusinessInfo: builder.mutation<
			TOperatorBusinessSchema,
			TOperatorBusinessSchema
		>({
			query: (body) => ({
				...OPERATOR_PATHS.createOperator,
				body: mapOperatorBusinessInfoToBackend(body)
			}),
			transformResponse: (response: TOperatorBusinessInfoBackend) =>
				mapOperatorBusinessInfoToFrontend(response)!,
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		getOperatorBusinessInfo: builder.query<
			TOperatorBusinessSchema | null,
			void
		>({
			query: () => ({
				...OPERATOR_PATHS.getOperatorInfo
			}),
			transformResponse: (
				response: TOperatorBusinessInfoBackend | null
			) => mapOperatorBusinessInfoToFrontend(response),
			providesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		updateOperatorBusinessInfo: builder.mutation<
			TOperatorBusinessSchema,
			TOperatorBusinessSchema
		>({
			query: (body) => ({
				...OPERATOR_PATHS.updateOperatorInfo,
				body: mapOperatorBusinessInfoToBackend(body)
			}),
			transformResponse: (response: TOperatorBusinessInfoBackend) =>
				mapOperatorBusinessInfoToFrontend(response)!,
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		getOperatorLogo: builder.query<Blob, void>({
			query: () => ({
				...OPERATOR_PATHS.getLogo,
				responseHandler: (response) => response.blob()
			})
		}),
		uploadOperatorLogo: builder.mutation<TOperatorBusinessSchema, File>({
			query: (file) => {
				const formData = new FormData();
				formData.append("file", file);
				return {
					...OPERATOR_PATHS.addLogo,
					body: formData
				};
			},
			transformResponse: (response: TOperatorBusinessInfoBackend) =>
				mapOperatorBusinessInfoToFrontend(response)!,
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		}),
		deleteOperatorLogo: builder.mutation<void, void>({
			query: () => ({
				...OPERATOR_PATHS.deleteLogo
			}),
			invalidatesTags: [ENUM_API_TAGS.BUSINESS]
		})
	})
});

export const {
	useCreateOperatorBusinessInfoMutation,
	useGetOperatorBusinessInfoQuery,
	useUpdateOperatorBusinessInfoMutation,
	useUploadOperatorLogoMutation,
	useDeleteOperatorLogoMutation,
	useGetOperatorLogoQuery
} = operatorBusinessApi;
