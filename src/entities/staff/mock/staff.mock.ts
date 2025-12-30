import { ENUM_COMMISSION_OPTIONS } from "@/entities/commission";

import {
	ENUM_STAFF_ROLE_OPTIONS,
	ENUM_STAFF_STATUS_OPTIONS,
	type IStaffBackend
} from "../types";

export const STAFF_MOCK: IStaffBackend[] = [
	{
		id: "1",
		first_name: "Иван",
		last_name: "Иванов",
		email: "ivan@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.ADMIN,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		type: ENUM_COMMISSION_OPTIONS.PERCENTAGE,
		split: 10
	},
	{
		id: "2",
		first_name: "Петр",
		last_name: "Петров",
		email: "petr@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		type: ENUM_COMMISSION_OPTIONS.FIXED,
		split: 5
	},
	{
		id: "3",
		first_name: "Анна",
		last_name: "Сидорова",
		email: "anna@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.PENDING,
		type: ENUM_COMMISSION_OPTIONS.PARTNER,
		split: null
	}
];
