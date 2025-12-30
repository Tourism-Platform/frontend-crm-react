import { ENUM_API_TAGS } from "@/shared/api";
import {
	type IPaginationRequest,
	type IPaginationResponse
} from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapStaffPaginatedToFrontend,
	mapStaffToBackend,
	mapStaffToFrontend
} from "../converters";
import type { IStaffBackend, IStaffUser } from "../types";

export const staffApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getStaff: builder.query<
			IPaginationResponse<IStaffUser>,
			IPaginationRequest | void
		>({
			query: (params) => ({
				url: "/staff",
				params: params || undefined
			}),
			transformResponse: (response: IPaginationResponse<IStaffBackend>) =>
				mapStaffPaginatedToFrontend(response),
			providesTags: [ENUM_API_TAGS.STAFF]
		}),
		createStaff: builder.mutation<IStaffUser, Partial<IStaffUser>>({
			query: (staff) => ({
				url: "/staff",
				method: "POST",
				body: mapStaffToBackend(staff)
			}),
			transformResponse: (response: IStaffBackend) =>
				mapStaffToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.STAFF]
		}),
		updateStaff: builder.mutation<
			IStaffUser,
			{ id: string; data: Partial<IStaffUser> }
		>({
			query: ({ id, data }) => ({
				url: `/staff/${id}`,
				method: "PATCH",
				body: mapStaffToBackend(data)
			}),
			transformResponse: (response: IStaffBackend) =>
				mapStaffToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.STAFF]
		}),
		deleteStaff: builder.mutation<void, string>({
			query: (id) => ({
				url: `/staff/${id}`,
				method: "DELETE"
			}),
			invalidatesTags: [ENUM_API_TAGS.STAFF]
		})
	})
});

export const {
	useGetStaffQuery,
	useCreateStaffMutation,
	useUpdateStaffMutation,
	useDeleteStaffMutation
} = staffApi;
