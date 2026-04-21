import type { CurrencyCode } from "@/shared/api";

import type {
	TAccountBackend,
	TAccountSchema,
	TUpdateAccountBackend
} from "../types";

export const mapAccountToFrontend = (
	backend: TAccountBackend
): TAccountSchema => ({
	avatar: backend.profile_picture_url ?? undefined,
	login: backend.first_name || "",
	first_name: backend.first_name || "",
	last_name: backend.last_name || "",
	title: backend.title || "",
	phone_number: backend.phone_number || "",
	location: backend.location || "",
	currency: backend.preferred_currency || ""
});

export const mapAccountToBackend = (
	frontend: TAccountSchema
): TUpdateAccountBackend => ({
	first_name: frontend.first_name,
	last_name: frontend.last_name,
	title: frontend.title,
	phone_number: frontend.phone_number,
	location: frontend.location,
	preferred_currency: frontend.currency as CurrencyCode
});
