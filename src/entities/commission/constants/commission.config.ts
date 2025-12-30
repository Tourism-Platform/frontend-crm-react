import type { TOptionsKeys } from "@/shared/config";

import { ENUM_COMMISSION_OPTIONS } from "../types";

export const COMMISSION_LABELS: Record<string, TOptionsKeys> = {
	[ENUM_COMMISSION_OPTIONS.FIXED]: "commission.fixed",
	[ENUM_COMMISSION_OPTIONS.PERCENTAGE]: "commission.percentage",
	[ENUM_COMMISSION_OPTIONS.PARTNER]: "commission.partner",
	[ENUM_COMMISSION_OPTIONS.PLATFORM]: "commission.platform",
	[ENUM_COMMISSION_OPTIONS.SERVICE_FEE]: "commission.service_fee"
} as const;
