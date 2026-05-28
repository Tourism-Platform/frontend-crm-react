import { ENUM_API_TAGS, OPERATOR_STAFF_PATHS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapStaffFiltersToBackend,
	mapStaffInviteToBackend,
	mapStaffPaginatedToFrontend,
	mapStaffUpdateToBackend
} from "../converters";
import type {
	IStaffFilters,
	IStaffUser,
	TEditStaffSchema,
	TInviteStaffSchema,
	TListStaffBackendResponse
} from "../types";

export const staffApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getStaff: builder.query<IPaginationResponse<IStaffUser>, IStaffFilters>(
			{
				query: (filters) => ({
					...OPERATOR_STAFF_PATHS.listStaff,
					params: mapStaffFiltersToBackend(filters)
				}),
				transformResponse: (response: TListStaffBackendResponse) =>
					mapStaffPaginatedToFrontend(response),
				providesTags: [ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION]
			}
		),
		createStaff: builder.mutation<IStaffUser, TInviteStaffSchema>({
			query: (staff) => ({
				...OPERATOR_STAFF_PATHS.inviteStaff,
				body: mapStaffInviteToBackend(staff)
			}),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION]
		}),
		updateStaff: builder.mutation<
			IStaffUser,
			{ id: string; data: TEditStaffSchema }
		>({
			query: ({ id, data }) => ({
				...OPERATOR_STAFF_PATHS.updateStaffMember(id),
				body: mapStaffUpdateToBackend(data)
			}),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION]
		}),
		deleteStaff: builder.mutation<void, string>({
			query: (id) => ({
				...OPERATOR_STAFF_PATHS.deleteStaffMember(id)
			}),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION]
		})
	})
});

export const {
	useGetStaffQuery,
	useCreateStaffMutation,
	useUpdateStaffMutation,
	useDeleteStaffMutation
} = staffApi;
