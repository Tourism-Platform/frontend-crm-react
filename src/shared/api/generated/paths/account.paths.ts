import type { AccountTypeRead } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const ACCOUNT_PATHS = {
	getAccountType: {
		url: "/account/type",
		method: "GET",
		_types: {} as { body: void; query: void; response: AccountTypeRead }
	} as const
} as const;
