import type { ENUM_RECONCILIATION_STATUS_TYPE } from "./reconciliation.types";

export interface IReconciliationFilters {
	search: string;
	status: ENUM_RECONCILIATION_STATUS_TYPE[];
	page: number;
	limit: number;
}
