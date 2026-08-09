import { createListenerMiddleware } from "@reduxjs/toolkit";

import { logout } from "@/entities/user/account/slice/user.slice";

import { authApi } from "../api/auth.api";

import { sessionExpired } from "./session-expired.action";

type TAuthListenerState = {
	userSlice: {
		isAuth: boolean;
	};
};

export const authSessionListener = createListenerMiddleware();

authSessionListener.startListening({
	actionCreator: sessionExpired,
	effect: (_, { dispatch, getState }) => {
		const { isAuth } = (getState() as TAuthListenerState).userSlice;

		if (!isAuth) {
			return;
		}

		dispatch(logout());
		dispatch(authApi.util.resetApiState());
	}
});
