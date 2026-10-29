import { createMockId } from "@/shared/api";

import { MOCK_OPERATOR_ID } from "@/entities/finance/finance-information/mock/operator-payment-routes.mock";

import {
	ENUM_AUDIT_PERMISSION_BACKEND,
	ENUM_AUDIT_USER_ROLE_BACKEND,
	type TAuditLogBackend
} from "../types";

const MOCK_AUDIT_USERS = [
	{
		user_id: createMockId("e400", 1),
		email: "admin@tourfirm.test",
		display_name: "Operator Admin",
		role: ENUM_AUDIT_USER_ROLE_BACKEND.OPERATOR_ADMIN
	},
	{
		user_id: createMockId("e400", 2),
		email: "manager@tourfirm.test",
		display_name: "Booking Manager",
		role: ENUM_AUDIT_USER_ROLE_BACKEND.OPERATOR_STAFF
	}
];

const MOCK_AUDIT_ACTIONS = [
	{
		method: "POST",
		path: "/tour",
		permission: ENUM_AUDIT_PERMISSION_BACKEND.TOUR_CREATE
	},
	{
		method: "PATCH",
		path: "/booking/order/operator",
		permission: ENUM_AUDIT_PERMISSION_BACKEND.BOOKING_WRITE
	},
	{
		method: "POST",
		path: "/invoice",
		permission: ENUM_AUDIT_PERMISSION_BACKEND.INVOICE_WRITE
	},
	{
		method: "DELETE",
		path: "/operator",
		permission: ENUM_AUDIT_PERMISSION_BACKEND.OPERATOR_DELETE
	},
	{
		method: "GET",
		path: "/ledger/operator",
		permission: ENUM_AUDIT_PERMISSION_BACKEND.LEDGER_READ
	}
];

export const AUDIT_LOG_MOCK: TAuditLogBackend[] = Array.from(
	{ length: 20 },
	(_, index) => {
		const action = MOCK_AUDIT_ACTIONS[index % MOCK_AUDIT_ACTIONS.length];

		return {
			id: createMockId("e401", index + 1),
			...MOCK_AUDIT_USERS[index % MOCK_AUDIT_USERS.length],
			operator_id: MOCK_OPERATOR_ID,
			agency_id: null,
			...action,
			// Каждый седьмой запрос — отказ по правам
			status_code: index % 7 === 6 ? 403 : 200,
			created_at: new Date(
				Date.UTC(2026, 9, 28, 18, 0) - index * 3_600_000
			).toISOString()
		};
	}
);
