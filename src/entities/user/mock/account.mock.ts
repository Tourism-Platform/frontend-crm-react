import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import type { IAccountBackend } from "../types";

export const mockUser: IAccountBackend = {
	username: "john_doe",
	firstName: "John",
	lastName: "Doe",
	title: "Manager",
	phoneNumber: "+79001112233",
	avatarUrl:
		"https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VzebIeMz6caC1wMEhR7Syjd9H0JNzslbn4xF8",
	location: "New York, USA",
	currency: ENUM_CURRENCY_OPTIONS.EUR
};
