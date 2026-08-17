import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import { baseApi, documentGeneratorApi } from "@/shared/api";

import { authApi } from "../api/auth.api";

export const resetAllApiState = (
	dispatch: ThunkDispatch<unknown, unknown, UnknownAction>
): void => {
	dispatch(baseApi.util.resetApiState());
	dispatch(authApi.util.resetApiState());
	dispatch(documentGeneratorApi.util.resetApiState());
};
