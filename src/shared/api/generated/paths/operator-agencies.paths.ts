import type {
	AgencyDiscountUpdate,
	AgencyInfoModel,
	AgencyInvite,
	AgencyListResponse,
	PartneredAgencyItem,
	PartneredAgencyListResponse
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const OPERATOR_AGENCIES_PATHS = {
	inviteAgency: {
		url: "/operator/agencies/invite",
		method: "POST",
		_types: {} as {
			body: AgencyInvite;
			query: void;
			response: PartneredAgencyItem;
		}
	} as const,
	listPartneredAgencies: {
		url: "/operator/agencies/partnered",
		method: "GET",
		_types: {} as {
			body: void;
			query: { q?: string | null; skip?: number; limit?: number };
			response: PartneredAgencyListResponse;
		}
	} as const,
	listAgencies: {
		url: "/operator/agencies/all",
		method: "GET",
		_types: {} as {
			body: void;
			query: { q?: string | null; skip?: number; limit?: number };
			response: AgencyListResponse;
		}
	} as const,
	getAgencyInfoById: (agencyId: string) =>
		({
			url: `/operator/agencies/${agencyId}/info`,
			method: "GET",
			_types: {} as { body: void; query: void; response: AgencyInfoModel }
		}) as const,
	setAgencyDiscount: (agencyId: string) =>
		({
			url: `/operator/agencies/${agencyId}/discount`,
			method: "PATCH",
			_types: {} as {
				body: AgencyDiscountUpdate;
				query: void;
				response: PartneredAgencyItem;
			}
		}) as const,
	deleteAgencyDiscount: (agencyId: string) =>
		({
			url: `/operator/agencies/${agencyId}/discount`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
