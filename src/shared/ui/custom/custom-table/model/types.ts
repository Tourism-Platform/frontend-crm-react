export interface IItem {
	id: string;
	name: string;
	email: string;
	location: string;
	flag: string;
	status: "Active" | "Inactive" | "Pending";
	balance: number;
}
