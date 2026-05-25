import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ENUM_LOCAL_STORAGE } from "@/shared/config";
import { storage } from "@/shared/lib";

interface IUserState {
	isAuth: boolean;
}

const rawAuth = storage.get<boolean>(ENUM_LOCAL_STORAGE.IS_AUTH, false);
const initialState: IUserState = {
	isAuth: rawAuth
};
export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		login: (state) => {
			storage.set(ENUM_LOCAL_STORAGE.IS_AUTH, true);
			state.isAuth = true;
		},
		logout: (state) => {
			storage.set(ENUM_LOCAL_STORAGE.IS_AUTH, false);
			state.isAuth = false;
		},
		setAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		}
	}
});

export default userSlice.reducer;
export const { login, logout, setAuth } = userSlice.actions;
