import { Currency } from "@/shared/api";

import type { TAccountBackend } from "../types";

export const ACCOUNT_MOCK: TAccountBackend = {
	id: "00000000-0000-4000-a100-000000000001",
	user_id: "00000000-0000-4000-a000-000000000001",
	first_name: "John",
	last_name: "Doe",
	title: "Manager",
	phone_number: "+79001112233",
	profile_picture_path:
		"https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VzebIeMz6caC1wMEhR7Syjd9H0JNzslbn4xF8",
	location: "New York, USA",
	default_currency: Currency.EUR
};

export const AGENCY_ACCOUNT_MOCK: TAccountBackend = {
	id: "00000000-0000-4000-a100-000000000002",
	user_id: "00000000-0000-4000-a000-000000000002",
	first_name: "Anna",
	last_name: "Smirnova",
	title: "Travel agent",
	phone_number: "+998901234567",
	profile_picture_path: null,
	location: "Tashkent, Uzbekistan",
	default_currency: Currency.USD
};
