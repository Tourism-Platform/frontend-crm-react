import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/api";

import { userSlice } from "@/entities/user";

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	[userSlice.reducerPath]: userSlice.reducer
	//   [authApi.reducerPath]: authApi.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				// authApi.middleware,
				baseApi.middleware
			)
	});
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore["dispatch"];
