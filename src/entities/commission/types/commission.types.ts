export const ENUM_COMMISSION_OPTIONS = {
	FIXED: "fixed",
	PERCENTAGE: "percentage",
	PARTNER: "partner",
	PLATFORM: "platform",
	SERVICE_FEE: "service_fee"
} as const;

export type ENUM_COMMISSION_OPTIONS_TYPE =
	(typeof ENUM_COMMISSION_OPTIONS)[keyof typeof ENUM_COMMISSION_OPTIONS];
