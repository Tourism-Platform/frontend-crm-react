import type {
	BodyAddLogoOperatorMeLogoPost,
	OperatorCreateSchema,
	OperatorFinancialSettingsModel,
	OperatorFinancialSettingsUpdate,
	OperatorInfoModel,
	OperatorInfoUpdate,
	OperatorModel
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const OPERATOR_PATHS = {
	createOperator: {
		url: "/operator/",
		method: "POST",
		_types: {} as {
			body: OperatorCreateSchema;
			query: void;
			response: OperatorModel;
		}
	} as const,
	getOperatorInfo: {
		url: "/operator/me/info",
		method: "GET",
		_types: {} as {
			body: void;
			query: void;
			response: OperatorInfoModel | null;
		}
	} as const,
	updateOperatorInfo: {
		url: "/operator/me/info",
		method: "PATCH",
		_types: {} as {
			body: OperatorInfoUpdate;
			query: void;
			response: OperatorInfoModel;
		}
	} as const,
	getOperatorFinancials: {
		url: "/operator/me/financials",
		method: "GET",
		_types: {} as {
			body: void;
			query: void;
			response: OperatorFinancialSettingsModel | null;
		}
	} as const,
	updateOperatorFinancials: {
		url: "/operator/me/financials",
		method: "PATCH",
		_types: {} as {
			body: OperatorFinancialSettingsUpdate;
			query: void;
			response: OperatorFinancialSettingsModel;
		}
	} as const,
	getOperator: (id: string) =>
		({
			url: `/operator/${id}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: OperatorModel }
		}) as const,
	udpateOperator: (id: string) =>
		({
			url: `/operator/${id}`,
			method: "PATCH",
			_types: {} as {
				body: OperatorCreateSchema;
				query: void;
				response: void;
			}
		}) as const,
	deleteOperator: (id: string) =>
		({
			url: `/operator/${id}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	getLogo: {
		url: "/operator/me/logo",
		method: "GET",
		_types: {} as { body: void; query: void; response: void }
	} as const,
	addLogo: {
		url: "/operator/me/logo",
		method: "POST",
		_types: {} as {
			body: BodyAddLogoOperatorMeLogoPost;
			query: void;
			response: OperatorInfoModel;
		}
	} as const,
	deleteLogo: {
		url: "/operator/me/logo",
		method: "DELETE",
		_types: {} as { body: void; query: void; response: void }
	} as const
} as const;
