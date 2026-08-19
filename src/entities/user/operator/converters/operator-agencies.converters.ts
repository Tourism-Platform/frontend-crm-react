import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import type {
	IOperatorAgencyInfo,
	IOperatorAgencyListItem,
	IPartneredAgency,
	TGetOperatorAgencyInfoBackendResponse,
	TListOperatorAgenciesBackendQuery,
	TListOperatorAgenciesBackendResponse,
	TListPartneredAgenciesBackendQuery,
	TListPartneredAgenciesBackendResponse,
	TOperatorAgencyListItemBackend,
	TPartneredAgencyItemBackend
} from "../types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export const mapOperatorAgencyFiltersToBackend = (
	filters: Partial<IPaginationRequest>
): TListOperatorAgenciesBackendQuery => {
	const page = filters.page ?? DEFAULT_PAGE;
	const limit = filters.limit ?? DEFAULT_LIMIT;

	return {
		...(page > 1 && { skip: (page - 1) * limit }),
		limit,
		...(filters.search?.trim() && { q: filters.search.trim() })
	};
};

export const mapPartneredAgencyFiltersToBackend = (
	filters: Partial<IPaginationRequest>
): TListPartneredAgenciesBackendQuery =>
	mapOperatorAgencyFiltersToBackend(filters);

export const mapOperatorAgencyListItemToFrontend = (
	item: TOperatorAgencyListItemBackend
): IOperatorAgencyListItem => ({
	id: item.id,
	name: item.name,
	businessName: item.business_name ?? null,
	legalName: item.legal_name ?? null,
	contactPerson: item.contact_person ?? null,
	contactEmail: item.contact_email ?? null,
	contactPhone: item.contact_phone ?? null,
	city: item.city ?? null,
	country: item.country ?? null,
	logoUrl: item.logo_url ?? null
});

export const mapOperatorAgencyListToFrontend = (
	response: TListOperatorAgenciesBackendResponse
): IPaginationResponse<IOperatorAgencyListItem> => ({
	data: response.data.map(mapOperatorAgencyListItemToFrontend),
	total: response.total_count
});

export const mapOperatorAgencyInfoToFrontend = (
	backend: TGetOperatorAgencyInfoBackendResponse
): IOperatorAgencyInfo => ({
	id: backend.id,
	agencyId: backend.agency_id,
	logoPath: backend.logo_path ?? null,
	description: backend.description ?? null,
	businessName: backend.business_name ?? null,
	websiteUrl: backend.website_url ?? null,
	legalName: backend.legal_name ?? null,
	directorName: backend.director_name ?? null,
	taxId: backend.tax_id ?? null,
	contactPerson: backend.contact_person ?? null,
	contactPosition: backend.contact_position ?? null,
	contactEmail: backend.contact_email ?? null,
	contactPhone: backend.contact_phone ?? null,
	addressLine: backend.address_line ?? null,
	city: backend.city ?? null,
	country: backend.country ?? null
});

export const mapPartneredAgencyToFrontend = (
	item: TPartneredAgencyItemBackend
): IPartneredAgency => ({
	agencyId: item.agency_id,
	name: item.name,
	invitedEmail: item.invited_email,
	invitedUserId: item.invited_user_id ?? null,
	partneredAt: item.partnered_at,
	discount: item.discount ?? null,
	businessName: item.business_name ?? null,
	contactPerson: item.contact_person ?? null,
	contactEmail: item.contact_email ?? null,
	contactPhone: item.contact_phone ?? null,
	city: item.city ?? null,
	country: item.country ?? null,
	websiteUrl: item.website_url ?? null,
	logoUrl: item.logo_url ?? null
});

export const mapPartneredAgencyListToFrontend = (
	response: TListPartneredAgenciesBackendResponse
): IPaginationResponse<IPartneredAgency> => ({
	data: response.data.map(mapPartneredAgencyToFrontend),
	total: response.total_count
});
