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
	},
	{
		id: "4",
		first_name: "Алексей",
		last_name: "Смирнов",
		email: "alex@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		type: ENUM_COMMISSION_OPTIONS.PERCENTAGE,
		split: 8
	},
	{
		id: "5",
		first_name: "Мария",
		last_name: "Кузнецова",
		email: "maria@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		type: ENUM_COMMISSION_OPTIONS.FIXED,
		split: 12
	},
	{
		id: "6",
		first_name: "Дмитрий",
		last_name: "Попов",
		email: "dmitry@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.INACTIVE,
		type: ENUM_COMMISSION_OPTIONS.PARTNER,
		split: null
	},
	{
		id: "7",
		first_name: "Елена",
		last_name: "Васильева",
		email: "elena@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.ADMIN,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		type: ENUM_COMMISSION_OPTIONS.PERCENTAGE,
		split: 15
	},
	{
		id: "8",
		first_name: "Сергей",
		last_name: "Соколов",
		email: "sergey@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.PENDING,
		type: ENUM_COMMISSION_OPTIONS.FIXED,
		split: 10
	},
	{
		id: "9",
		first_name: "Ольга",
		last_name: "Михайлова",
		email: "olga@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		type: ENUM_COMMISSION_OPTIONS.PARTNER,
		split: null
	},
	{
		id: "10",
		first_name: "Андрей",
		last_name: "Новиков",
		email: "andrey@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		type: ENUM_COMMISSION_OPTIONS.PERCENTAGE,
		split: 7
	},
	{
		id: "11",
		first_name: "Наталья",
		last_name: "Федорова",
		email: "natalya@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		type: ENUM_COMMISSION_OPTIONS.FIXED,
		split: 9
	},
	{
		id: "12",
		first_name: "Игорь",
		last_name: "Морозов",
		email: "igor@example.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.PENDING,
		type: ENUM_COMMISSION_OPTIONS.PARTNER,
		split: null
	}
];
