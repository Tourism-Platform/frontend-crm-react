import { createListenerMiddleware } from "@reduxjs/toolkit";

import { monitoring } from "@/shared/lib";

import { logout } from "@/entities/user/account/slice/user.slice";

import { AuthService } from "../api/auth.service";

export const authMonitoringListener = createListenerMiddleware();

/** Аккаунт приходит и при входе, и при восстановлении сессии */
const ACCOUNT_RECEIVED_MATCHERS = [
	AuthService.endpoints.signIn.matchFulfilled,
	AuthService.endpoints.getAuthAccount.matchFulfilled
];

for (const matcher of ACCOUNT_RECEIVED_MATCHERS) {
	authMonitoringListener.startListening({
		matcher,
		effect: ({ payload }) => {
			// Без email: в мониторинг уходит только то, что нужно для поиска ошибок
			monitoring.setUser({ id: payload.id, role: payload.role });
		}
	});
}

authMonitoringListener.startListening({
	actionCreator: logout,
	effect: () => {
		monitoring.setUser(null);
	}
});
