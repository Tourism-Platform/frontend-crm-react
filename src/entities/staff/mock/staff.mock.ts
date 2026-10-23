import {
	type PermissionGroupRead,
	Permissions,
	type StaffRead,
	StaffStatus,
	UserRoles,
	createMockId
} from "@/shared/api";

import { STAFF_SEED } from "./staff.seed";

const STAFF_STATUSES = [
	StaffStatus.Active,
	StaffStatus.Active,
	StaffStatus.Pending,
	StaffStatus.Active,
	StaffStatus.Active,
	StaffStatus.Inactive
];

export const buildStaffUserId = (index: number) => createMockId("e400", index);

/** Сотрудники оператора из общего сида (его же использует scripts/seeders/staff) */
export const STAFF_MOCK: (StaffRead & { permissions: Permissions[] })[] =
	STAFF_SEED.map((staff, index) => ({
		user_id: buildStaffUserId(index + 1),
		first_name: staff.firstName,
		last_name: staff.lastName,
		email: staff.email,
		role: UserRoles.OperatorStaff,
		status: STAFF_STATUSES[index % STAFF_STATUSES.length],
		commission_percent: index % 3 === 2 ? null : 5 + (index % 4) * 2.5,
		permissions: (staff.permissions ?? []) as Permissions[]
	}));

export const PERMISSION_GROUPS_MOCK: PermissionGroupRead[] = [
	{
		id: createMockId("e410", 1),
		name: "Sales",
		permissions: [
			Permissions.BookingRead,
			Permissions.BookingWrite,
			Permissions.CatalogRead,
			Permissions.BookingPaxWrite
		]
	},
	{
		id: createMockId("e410", 2),
		name: "Tour builders",
		permissions: [
			Permissions.TourRead,
			Permissions.TourCreate,
			Permissions.TourUpdate,
			Permissions.TourOptionWrite,
			Permissions.TourEventWrite,
			Permissions.SupplierRead
		]
	},
	{
		id: createMockId("e410", 3),
		name: "Accounting",
		permissions: [
			Permissions.InvoiceRead,
			Permissions.InvoiceWrite,
			Permissions.LedgerRead,
			Permissions.BookingPaymentRead,
			Permissions.SupplierPaymentRead
		]
	}
];
