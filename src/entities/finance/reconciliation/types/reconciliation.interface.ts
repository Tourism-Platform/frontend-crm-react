import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_RECONCILIATION_STATUS_TYPE } from "./reconciliation.types";

export interface IReconciliation {
	id: string;
	orderId: string;
	client: string;
	plannedRevenue: number;
	actualRevenue: number;
	plannedCost: number;
	actualCost: number;
	variance: number;
	status: ENUM_RECONCILIATION_STATUS_TYPE;
	currency: string;
}

export type TReconciliationStatusCounts = Record<
	ENUM_RECONCILIATION_STATUS_TYPE,
	number
>;

export interface IReconciliationPaginatedResponse
	extends IPaginationResponse<IReconciliation> {
	statusCounts: TReconciliationStatusCounts;
}
