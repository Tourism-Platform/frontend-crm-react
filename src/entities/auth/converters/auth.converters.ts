import type { IAuthUser, TAuthUserBackend } from "../types";

export const mapAuthUserToBackend = (user: IAuthUser): TAuthUserBackend => ({
	email: user.email,
	password: user.password
});

export const mapAuthUserToFrontend = (user: TAuthUserBackend): IAuthUser => ({
	email: user.email,
	password: user.password
});
