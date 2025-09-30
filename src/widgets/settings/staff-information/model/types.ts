export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	status: "Active" | "Inactive";
	split: number | null;
}
