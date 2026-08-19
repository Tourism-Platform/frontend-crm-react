import { ENUM_PERMISSION, type TInviteStaffSchema } from "../types";

export const STAFF_SEED: readonly TInviteStaffSchema[] = [
	{
		email: "ivan.ivanov@example.com",
		firstName: "Ivan",
		lastName: "Ivanov",
		permissions: [ENUM_PERMISSION.LEDGER_READ, ENUM_PERMISSION.INVOICE_READ]
	},
	{
		email: "petr.petrov@example.com",
		firstName: "Petr",
		lastName: "Petrov",
		permissions: [
			ENUM_PERMISSION.BOOKING_READ,
			ENUM_PERMISSION.BOOKING_WRITE
		]
	},
	{
		email: "anna.sidorova@example.com",
		firstName: "Anna",
		lastName: "Sidorova",
		permissions: [
			ENUM_PERMISSION.BOOKING_READ,
			ENUM_PERMISSION.CATALOG_READ
		]
	},
	{
		email: "aleksey.smirnov@example.com",
		firstName: "Aleksey",
		lastName: "Smirnov",
		permissions: [ENUM_PERMISSION.TOUR_READ, ENUM_PERMISSION.TOUR_UPDATE]
	},
	{
		email: "maria.kuznetsova@example.com",
		firstName: "Maria",
		lastName: "Kuznetsova",
		permissions: [ENUM_PERMISSION.TOUR_READ]
	},
	{
		email: "dmitriy.popov@example.com",
		firstName: "Dmitriy",
		lastName: "Popov",
		permissions: [ENUM_PERMISSION.BOOKING_READ]
	},
	{
		email: "elena.vasilyeva@example.com",
		firstName: "Elena",
		lastName: "Vasilyeva",
		permissions: [ENUM_PERMISSION.LEDGER_READ]
	},
	{
		email: "sergey.sokolov@example.com",
		firstName: "Sergey",
		lastName: "Sokolov",
		permissions: [ENUM_PERMISSION.SUPPLIER_READ]
	},
	{
		email: "olga.mikhaylova@example.com",
		firstName: "Olga",
		lastName: "Mikhaylova",
		permissions: [ENUM_PERMISSION.BOOKING_READ]
	},
	{
		email: "andrey.novikov@example.com",
		firstName: "Andrey",
		lastName: "Novikov",
		permissions: [ENUM_PERMISSION.TOUR_READ]
	}
];
