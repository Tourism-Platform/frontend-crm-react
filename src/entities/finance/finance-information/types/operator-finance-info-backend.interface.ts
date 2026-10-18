import type {
	OPERATOR_PATHS,
	OperatorFinancialSettingsRead,
	OperatorFinancialSettingsUpdate
} from "@/shared/api";

export type TOperatorFinanceInfoBackend = OperatorFinancialSettingsRead;
export type TOperatorFinanceInfoBackendUpdate = OperatorFinancialSettingsUpdate;

export type TOperatorFinanceInfoBackendResponse =
	typeof OPERATOR_PATHS.getOperatorFinancials._types.response;
