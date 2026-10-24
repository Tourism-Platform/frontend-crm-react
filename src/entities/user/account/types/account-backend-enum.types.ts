import { AccountType } from "@/shared/api";

export const ENUM_ACCOUNT_TYPE_BACKEND = {
	TOUR_OPERATOR: AccountType.TourOperator,
	TOUR_AGENCY: AccountType.TourAgency
} as const;

export type ENUM_ACCOUNT_TYPE_BACKEND_TYPE = AccountType;
