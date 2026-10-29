import type { TOUR_OPTION_PATHS } from "@/shared/api";

export type TGetPriceMatrixBackendResponse = ReturnType<
	typeof TOUR_OPTION_PATHS.getPriceMatrix
>["_types"]["response"];

export type TGetPriceMatrixBackendQuery = ReturnType<
	typeof TOUR_OPTION_PATHS.getPriceMatrix
>["_types"]["query"];

export type TPriceMatrixRowBackend = Extract<
	TGetPriceMatrixBackendResponse,
	{ typ: "per_pax" }
>["rows"][number];

export type TPriceMatrixBracketBackend = Extract<
	TGetPriceMatrixBackendResponse,
	{ typ: "per_range" }
>["brackets"][number];
