import type { TOUR_EVENTS_PATHS } from "@/shared/api/generated/paths/tour-events.paths";

export type TSupplierPolicyWarningListBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.policyCheckEvent
>["_types"]["response"];

export type TSupplierPolicyWarningBackend =
	TSupplierPolicyWarningListBackend[number];
