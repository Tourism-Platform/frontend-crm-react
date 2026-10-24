import { createMockId } from "@/shared/api";

import {
	ENUM_PERMISSION_BACKEND,
	type ENUM_PERMISSION_BACKEND_TYPE,
	ENUM_STAFF_STATUS_BACKEND,
	ENUM_USER_ROLES_BACKEND,
	type TPermissionGroupReadBackend,
	type TStaffReadBackend
} from "../types";

import { STAFF_SEED } from "./staff.seed";

const STAFF_STATUSES = [
	ENUM_STAFF_STATUS_BACKEND.ACTIVE,
	ENUM_STAFF_STATUS_BACKEND.ACTIVE,
	ENUM_STAFF_STATUS_BACKEND.PENDING,
	ENUM_STAFF_STATUS_BACKEND.ACTIVE,
	ENUM_STAFF_STATUS_BACKEND.ACTIVE,
	ENUM_STAFF_STATUS_BACKEND.INACTIVE
];

export const buildStaffUserId = (index: number) => createMockId("e400", index);

/** Сотрудники оператора из общего сида (его же использует scripts/seeders/staff) */
export const STAFF_MOCK: (TStaffReadBackend & {
	permissions: ENUM_PERMISSION_BACKEND_TYPE[];
})[] = STAFF_SEED.map((staff, index) => ({
	user_id: buildStaffUserId(index + 1),
	first_name: staff.firstName,
	last_name: staff.lastName,
	email: staff.email,
	role: ENUM_USER_ROLES_BACKEND.OPERATOR_STAFF,
	status: STAFF_STATUSES[index % STAFF_STATUSES.length],
	commission_percent: index % 3 === 2 ? null : 5 + (index % 4) * 2.5,
	permissions: (staff.permissions ?? []) as ENUM_PERMISSION_BACKEND_TYPE[]
}));

export const PERMISSION_GROUPS_MOCK: TPermissionGroupReadBackend[] = [
	{
		id: createMockId("e410", 1),
		name: "Sales",
		permissions: [
			ENUM_PERMISSION_BACKEND.BOOKING_READ,
			ENUM_PERMISSION_BACKEND.BOOKING_WRITE,
			ENUM_PERMISSION_BACKEND.CATALOG_READ,
			ENUM_PERMISSION_BACKEND.BOOKING_PAX_WRITE
		]
	},
	{
		id: createMockId("e410", 2),
		name: "Tour builders",
		permissions: [
			ENUM_PERMISSION_BACKEND.TOUR_READ,
			ENUM_PERMISSION_BACKEND.TOUR_CREATE,
			ENUM_PERMISSION_BACKEND.TOUR_UPDATE,
			ENUM_PERMISSION_BACKEND.TOUR_OPTION_WRITE,
			ENUM_PERMISSION_BACKEND.TOUR_EVENT_WRITE,
			ENUM_PERMISSION_BACKEND.SUPPLIER_READ
		]
	},
	{
		id: createMockId("e410", 3),
		name: "Accounting",
		permissions: [
			ENUM_PERMISSION_BACKEND.INVOICE_READ,
			ENUM_PERMISSION_BACKEND.INVOICE_WRITE,
			ENUM_PERMISSION_BACKEND.LEDGER_READ,
			ENUM_PERMISSION_BACKEND.BOOKING_PAYMENT_READ,
			ENUM_PERMISSION_BACKEND.SUPPLIER_PAYMENT_READ
		]
	}
];
