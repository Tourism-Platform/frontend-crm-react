import type { OPERATOR_AGENCIES_PATHS } from "@/shared/api";

export type TInviteAgencyBackendBody =
	typeof OPERATOR_AGENCIES_PATHS.inviteAgency._types.body;

export type TPartneredAgencyItemBackend =
	typeof OPERATOR_AGENCIES_PATHS.inviteAgency._types.response;

export type TListPartneredAgenciesBackendResponse =
	typeof OPERATOR_AGENCIES_PATHS.listPartneredAgencies._types.response;

export type TListPartneredAgenciesBackendQuery =
	typeof OPERATOR_AGENCIES_PATHS.listPartneredAgencies._types.query;

export type TListOperatorAgenciesBackendResponse =
	typeof OPERATOR_AGENCIES_PATHS.listAgencies._types.response;

export type TListOperatorAgenciesBackendQuery =
	typeof OPERATOR_AGENCIES_PATHS.listAgencies._types.query;

export type TOperatorAgencyListItemBackend =
	TListOperatorAgenciesBackendResponse["data"][number];

export type TGetOperatorAgencyInfoBackendResponse = ReturnType<
	typeof OPERATOR_AGENCIES_PATHS.getAgencyInfoById
>["_types"]["response"];

export type TSetAgencyDiscountBackendBody = ReturnType<
	typeof OPERATOR_AGENCIES_PATHS.setAgencyDiscount
>["_types"]["body"];

export type TPartneredAgencyDiscountBackend = NonNullable<
	TPartneredAgencyItemBackend["discount"]
>;
