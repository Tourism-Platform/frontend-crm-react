import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_COMMISSION_OPTIONS_TYPE } from "@/entities/commission";

import type {
	IStaffFilters,
	IStaffUser,
	TEditStaffSchema,
	TInviteStaffBackendBody,
	TInviteStaffSchema,
	TListStaffBackendResponse,
	TListStaffQuery,
	TStaffReadBackend,
	TUpdateStaffBackendBody
} from "../types";

import {
	staffRoleInviteConverter,
	staffRoleReadConverter,
	staffRoleUpdateConverter
} from "./staff-role.converters";
import {
	staffStatusReadConverter,
	staffStatusUpdateConverter
} from "./staff-status.converters";

export const mapStaffToFrontend = (data: TStaffReadBackend): IStaffUser => ({
	id: data.user_id,
	firstName: data.first_name || "",
	lastName: data.last_name || "",
	email: data.email,
	role: staffRoleReadConverter.from(data.role)!,
	status: staffStatusReadConverter.from(data.status)!,
	type: "percentage" as ENUM_COMMISSION_OPTIONS_TYPE,
	split: Number(((data.commission_percent ?? 0) * 100).toFixed(2))
});

export const mapStaffInviteToBackend = (
	data: TInviteStaffSchema
): TInviteStaffBackendBody => ({
	email: data.email,
	first_name: data.firstName,
	last_name: data.lastName,
	role: staffRoleInviteConverter.to(data.role)!
});

export const mapStaffUpdateToBackend = (
	data: TEditStaffSchema
): TUpdateStaffBackendBody => ({
	first_name: data.firstName,
	last_name: data.lastName,
	role: staffRoleUpdateConverter.to(data.role!)!,
	status: staffStatusUpdateConverter.to(data.status!),
	commission_percent: Number(((data.split ?? 0) / 100).toFixed(2))
});

export const mapStaffListToFrontend = (
	data: TStaffReadBackend[]
): IStaffUser[] => data.map(mapStaffToFrontend);

export const mapStaffPaginatedToFrontend = (
	response: TListStaffBackendResponse
): IPaginationResponse<IStaffUser> => ({
	data: mapStaffListToFrontend(response.data),
	total: response.total_count
});

export const mapStaffFiltersToBackend = (
	filters: IStaffFilters
): TListStaffQuery => ({
	...(filters?.page > 1 && { skip: (filters.page - 1) * filters?.limit }),
	...(filters?.limit && { limit: filters.limit }),
	...(!!filters?.status?.length && {
		statuses: staffStatusReadConverter.toMany(filters.status)
	}),
	...(!!filters?.search?.trim().length && { q: filters.search })
});
