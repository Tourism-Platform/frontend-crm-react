import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
	isAuth: boolean;
}

const initialState: IUserState = {
	isAuth: false
};
export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		login: (state) => {
			state.isAuth = true;
		},
		logout: (state) => {
			state.isAuth = false;
		},
		setAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		}
	}
});

export default userSlice.reducer;
export const { login, logout, setAuth } = userSlice.actions;
