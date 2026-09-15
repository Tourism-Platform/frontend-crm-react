import type { TOUR_OPTION_PATHS } from "@/shared/api";

export type TGetPricingBreakdownBackendResponse = ReturnType<
	typeof TOUR_OPTION_PATHS.getPricingBreakdown
>["_types"]["response"];

export type TTourMinMaxCostBackend =
	TGetPricingBreakdownBackendResponse["estimated_cost"];

export type TTourMinMaxPaxBackend = TGetPricingBreakdownBackendResponse["pax"];

export type TTourSummaryEventBackend =
	TGetPricingBreakdownBackendResponse["events"][number];

export type TStandaloneBillableBackend = Extract<
	TTourSummaryEventBackend,
	{ typ: "individual_bill" }
>;

export type TPackageBillableBackend = Extract<
	TTourSummaryEventBackend,
	{ typ: "package_bill" }
>;

export type TSummaryEventLineBackend =
	TPackageBillableBackend["events"][number];

export type TOperatorEventBackend = TStandaloneBillableBackend["event"];

export type TBreakdownSpreadBackend = TStandaloneBillableBackend["breakdown"];

export type TBreakdownLineBackend = TBreakdownSpreadBackend["min"][number];

export type TPricingWarningBackend =
	TStandaloneBillableBackend["warnings"][number];
