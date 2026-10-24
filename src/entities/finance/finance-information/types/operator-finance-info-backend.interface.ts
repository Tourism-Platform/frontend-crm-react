import type {
	ClassicSwiftDetails,
	CustomDetails,
	OPERATOR_PATHS,
	OperatorFinancialSettingsRead,
	OperatorFinancialSettingsUpdate
} from "@/shared/api";

export type TOperatorFinanceInfoBackend = OperatorFinancialSettingsRead;
export type TOperatorFinanceInfoBackendUpdate = OperatorFinancialSettingsUpdate;

export type TOperatorFinanceInfoBackendResponse =
	typeof OPERATOR_PATHS.getOperatorFinancials._types.response;
export type TClassicSwiftDetailsBackend = ClassicSwiftDetails;
export type TCustomDetailsBackend = CustomDetails;
