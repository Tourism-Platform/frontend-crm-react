import type { PRICING_REVIEW_PATHS } from "@/shared/api";

export type TGetTourSummaryBackendResponce = ReturnType<
	typeof PRICING_REVIEW_PATHS.getTourSummary
>["_types"]["response"];

export type TTourMinMaxCostBackend = TGetTourSummaryBackendResponce["cost"];

export type TTourSummaryEventBackend =
	TGetTourSummaryBackendResponce["events"][number];

export type TStandaloneBillableBackend = Extract<
	TTourSummaryEventBackend,
	{ event_id: string }
>;

export type TPackageBillableBackend = Extract<
	TTourSummaryEventBackend,
	{ package: unknown }
>;

export type TSummaryEventLineBackend =
	TPackageBillableBackend["events"][number];

export type TOperatorEventBackend = TStandaloneBillableBackend["event"];
