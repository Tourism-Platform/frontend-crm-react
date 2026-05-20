import { Currency } from "@/shared/api";

import type { TAccountBackend } from "../types";

export const ACCOUNT_MOCK: TAccountBackend = {
	id: "1",
	user_id: "1",
	first_name: "John",
	last_name: "Doe",
	title: "Manager",
	phone_number: "+79001112233",
	profile_picture_url:
		"https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VzebIeMz6caC1wMEhR7Syjd9H0JNzslbn4xF8",
	location: "New York, USA",
	default_currency: Currency.EUR
};
