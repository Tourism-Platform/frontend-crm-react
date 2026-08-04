import { StaffInviteRoleEnum } from "../../../shared/api/generated/Api";
import { OPERATOR_STAFF_PATHS } from "../../../shared/api/generated/paths";

export type TStaffSeedItem =
	typeof OPERATOR_STAFF_PATHS.inviteStaff._types.body;

export const STAFF_SEED: readonly TStaffSeedItem[] = [
	{
		email: "ivan.ivanov@example.com",
		first_name: "Ivan",
		last_name: "Ivanov",
		role: StaffInviteRoleEnum.OperatorAccountant
	},
	{
		email: "petr.petrov@example.com",
		first_name: "Petr",
		last_name: "Petrov",
		role: StaffInviteRoleEnum.OperatorSalesManager
	},
	{
		email: "anna.sidorova@example.com",
		first_name: "Anna",
		last_name: "Sidorova",
		role: StaffInviteRoleEnum.OperatorSalesManager
	},
	{
		email: "aleksey.smirnov@example.com",
		first_name: "Aleksey",
		last_name: "Smirnov",
		role: StaffInviteRoleEnum.OperatorSalesManager
	},
	{
		email: "maria.kuznetsova@example.com",
		first_name: "Maria",
		last_name: "Kuznetsova",
		role: StaffInviteRoleEnum.OperatorSalesManager
	},
	{
		email: "dmitriy.popov@example.com",
		first_name: "Dmitriy",
		last_name: "Popov",
		role: StaffInviteRoleEnum.OperatorSalesManager
	},
	{
		email: "elena.vasilyeva@example.com",
		first_name: "Elena",
		last_name: "Vasilyeva",
		role: StaffInviteRoleEnum.OperatorAccountant
	},
	{
		email: "sergey.sokolov@example.com",
		first_name: "Sergey",
		last_name: "Sokolov",
		role: StaffInviteRoleEnum.OperatorSalesManager
	},
	{
		email: "olga.mikhaylova@example.com",
		first_name: "Olga",
		last_name: "Mikhaylova",
		role: StaffInviteRoleEnum.OperatorSalesManager
	},
	{
		email: "andrey.novikov@example.com",
		first_name: "Andrey",
		last_name: "Novikov",
		role: StaffInviteRoleEnum.OperatorSalesManager
	}
] as const;
