import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_COMMISSION_OPTIONS_TYPE } from "@/entities/commission";

import type { IStaffBackend, IStaffFilters, IStaffUser } from "../types";

export const mapStaffToFrontend = (data: IStaffBackend): IStaffUser => ({
	id: data.id,
	first_name: data.first_name,
	last_name: data.last_name,
	email: data.email,
	role: data.role,
	status: data.status,
	type: data.type as ENUM_COMMISSION_OPTIONS_TYPE,
	split: data.split
});

export const mapStaffToBackend = (
	data: Partial<IStaffUser>
): Partial<IStaffBackend> => ({
	id: data.id,
	first_name: data.first_name,
	last_name: data.last_name,
	email: data.email,
	role: data.role,
	status: data.status,
	type: data.type,
	split: data.split
});

export const mapStaffListToFrontend = (data: IStaffBackend[]): IStaffUser[] =>
	data.map(mapStaffToFrontend);

export const mapStaffPaginatedToFrontend = (
	response: IPaginationResponse<IStaffBackend>
): IPaginationResponse<IStaffUser> => ({
	data: mapStaffListToFrontend(response.data),
	total: response.total
});

export const mapStaffFiltersToBackend = (filters: IStaffFilters) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined
});
