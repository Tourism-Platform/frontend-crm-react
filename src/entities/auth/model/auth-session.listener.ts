import { createListenerMiddleware } from "@reduxjs/toolkit";

import { logout } from "@/entities/user/account/slice/user.slice";

import { AuthService } from "../api/auth.service";
import { resetAllApiState } from "../lib/reset-api-state";

import { sessionExpired } from "./session-expired.action";

type TAuthListenerState = {
	userSlice: {
		isAuth: boolean;
	};
};

export const authSessionListener = createListenerMiddleware();

/**
 * 401 сессии. Параллельные 401 обрабатываются один раз: первый
 * сразу снимает isAuth, остальные выходят на проверке
 */
authSessionListener.startListening({
	actionCreator: sessionExpired,
	effect: async (_, { dispatch, getState }) => {
		const { isAuth } = (getState() as TAuthListenerState).userSlice;

		if (!isAuth) {
			return;
		}

		dispatch(logout());
		// Закрываем сессию и на сервере: если cookie ещё жива, /me вернёт
		// аккаунт, вход восстановится и тот же 401 повторится по кругу.
		// Ошибку выхода не ждём от пользователя — 401 на нём не зациклится (isAuth уже false)
		const isSignedOut = await dispatch(
			AuthService.endpoints.signOut.initiate()
		)
			.unwrap()
			.then(() => true)
			.catch(() => false);
		// Все API, включая baseApi с аккаунтом (/me): иначе ProtectedRoute видит
		// закэшированный аккаунт и не уводит на логин. Успешный выход уже сбросил
		// кэш в signOut.onQueryStarted — второй сброс заново подписал бы хуки (лишний /me)
		if (!isSignedOut) {
			resetAllApiState(dispatch);
		}
	}
});
