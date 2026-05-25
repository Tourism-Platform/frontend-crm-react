export interface IAuthUser {
	email: string;
	password: string;
}

export interface IAuthAccount {
	id: string;
	email: string;
	role: string;
	picture: string | null;
	agency_id: string | null;
	operator_id: string | null;
}
