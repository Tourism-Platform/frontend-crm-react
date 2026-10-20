import type {
	SEASONAL_COMMISSION_PATHS,
	SeasonalityCommissionCreate,
	SeasonalityCommissionModel
} from "@/shared/api";

export type TSeasonalityCommissionBackend = SeasonalityCommissionModel;
export type TSeasonalityCommissionCreateBackend = SeasonalityCommissionCreate;
export type TSeasonalityCommissionUpdateBackend = SeasonalityCommissionCreate;

export type TListSeasonalityBackendQuery = ReturnType<
	typeof SEASONAL_COMMISSION_PATHS.getTourCommissions
>["_types"]["query"];

export type TListSeasonalityBackendResponse = ReturnType<
	typeof SEASONAL_COMMISSION_PATHS.getTourCommissions
>["_types"]["response"];
