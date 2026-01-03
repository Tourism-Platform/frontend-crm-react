import { type IPaginationResponse } from "@/shared/types";

import type { TReconciliationStatusCounts } from "./reconciliation.interface";
import type { ENUM_RECONCILIATION_STATUS_TYPE } from "./reconciliation.types";

export interface IReconciliationBackend {
	id: string;
	order_id: string;
	client: string;
	planned_revenue: number;
	actual_revenue: number;
	planned_cost: number;
	actual_cost: number;
	variance: number;
	status: ENUM_RECONCILIATION_STATUS_TYPE;
	currency: string;
}

export interface IReconciliationPaginatedResponseBackend
	extends IPaginationResponse<IReconciliationBackend> {
	status_counts: TReconciliationStatusCounts;
}
