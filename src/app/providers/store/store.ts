import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi, documentGeneratorApi } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";
import { authSessionListener } from "@/entities/auth/model/auth-session.listener";
import { userSlice } from "@/entities/user";

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[documentGeneratorApi.reducerPath]: documentGeneratorApi.reducer,
	[userSlice.reducerPath]: userSlice.reducer
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.prepend(authSessionListener.middleware)
				.concat(
					baseApi.middleware,
					authApi.middleware,
					documentGeneratorApi.middleware
				)
	});
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore["dispatch"];
