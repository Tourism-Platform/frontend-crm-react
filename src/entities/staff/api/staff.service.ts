import {
	ENUM_API_TAGS,
	OPERATOR_STAFF_PATHS,
	PERMISSION_GROUPS_PATHS
} from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapPermissionGroupToFrontend,
	mapStaffAccessToBackend,
	mapStaffAccessToFrontend,
	mapStaffFiltersToBackend,
	mapStaffInviteToBackend,
	mapStaffPaginatedToFrontend,
	mapStaffToFrontend,
	mapStaffUpdateToBackend
} from "../converters";
import type {
	IPermissionGroup,
	IStaffAccess,
	IStaffAccessForm,
	IStaffFilters,
	IStaffUser,
	TEditStaffSchema,
	TInviteStaffBackendResponse,
	TInviteStaffSchema,
	TListStaffBackendResponse,
	TPermissionGroupListBackend,
	TStaffAccessReadBackend,
	TStaffReadBackend
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
			transformResponse: (response: TInviteStaffBackendResponse) =>
				mapStaffToFrontend(response),
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
			transformResponse: (response: TStaffReadBackend) =>
				mapStaffToFrontend(response),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION]
		}),
		deleteStaff: builder.mutation<void, string>({
			query: (id) => ({
				...OPERATOR_STAFF_PATHS.deleteStaffMember(id)
			}),
			invalidatesTags: [ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION]
		}),
		getStaffMemberPermissions: builder.query<IStaffAccess, string>({
			query: (userId) => ({
				...OPERATOR_STAFF_PATHS.getStaffMemberPermissions(userId)
			}),
			transformResponse: (response: TStaffAccessReadBackend) =>
				mapStaffAccessToFrontend(response),
			providesTags: (_result, _error, userId) => [
				{
					type: ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION,
					id: userId
				}
			]
		}),
		replaceStaffMemberAccess: builder.mutation<
			IStaffAccess,
			{ id: string; data: IStaffAccessForm }
		>({
			query: ({ id, data }) => ({
				...OPERATOR_STAFF_PATHS.replaceStaffMemberAccess(id),
				body: mapStaffAccessToBackend(data)
			}),
			transformResponse: (response: TStaffAccessReadBackend) =>
				mapStaffAccessToFrontend(response),
			invalidatesTags: (_result, _error, { id }) => [
				ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION,
				{ type: ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION, id }
			]
		}),
		getPermissionGroups: builder.query<IPermissionGroup[], void>({
			query: () => ({ ...PERMISSION_GROUPS_PATHS.listPermissionGroups }),
			transformResponse: (response: TPermissionGroupListBackend) =>
				response.data.map(mapPermissionGroupToFrontend),
			providesTags: [ENUM_API_TAGS.OPERATOR.STAFF_INFORMATION]
		})
	})
});

export const {
	useGetStaffQuery,
	useCreateStaffMutation,
	useUpdateStaffMutation,
	useDeleteStaffMutation,
	useGetStaffMemberPermissionsQuery,
	useReplaceStaffMemberAccessMutation,
	useGetPermissionGroupsQuery
} = staffApi;
