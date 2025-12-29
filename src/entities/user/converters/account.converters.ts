import type { IAccountBackend, TAccountSchema } from "../types";

export const mapAccountToFrontend = (
	backend: IAccountBackend
): TAccountSchema => ({
	avatar: backend.avatarUrl,
	login: backend.username,
	first_name: backend.firstName,
	last_name: backend.lastName,
	title: backend.title,
	phone_number: backend.phoneNumber,
	location: backend.location,
	currency: backend.currency
});

export const mapAccountToBackend = (
	frontend: TAccountSchema
): IAccountBackend => ({
	avatarUrl: frontend.avatar || "",
	username: frontend.login,
	firstName: frontend.first_name,
	lastName: frontend.last_name,
	title: frontend.title,
	phoneNumber: frontend.phone_number,
	location: frontend.location,
	currency: frontend.currency
});
