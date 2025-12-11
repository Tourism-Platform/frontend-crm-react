import {
	ENUM_STAFF_ROLE_OPTIONS,
	ENUM_STAFF_STATUS_OPTIONS,
	type IStaffUser
} from "@/entities/staff";

export const STAFF_USERS: IStaffUser[] = [
	{
		id: "1",
		firstName: "Samantha",
		lastName: "Luis",
		email: "samantha.luis@travelhub.com",
		role: ENUM_STAFF_ROLE_OPTIONS.ADMIN,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		split: null
	},
	{
		id: "2",
		firstName: "Alex",
		lastName: "Benford",
		email: "alex.benford@travelhub.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.INACTIVE,
		split: 0.05
	},
	{
		id: "3",
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@travelhub.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.PENDING,
		split: 0.01
	},
	{
		id: "4",
		firstName: "Emily",
		lastName: "Clark",
		email: "emily.clark@travelhub.com",
		role: ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
		status: ENUM_STAFF_STATUS_OPTIONS.ACTIVE,
		split: null
	}
	// {
	//     id: "5",
	//     firstName: "Michael",
	//     lastName: "Brown",
	//     email: "michael.brown@travelhub.com",
	//     role: "Marketing Manager",
	//     status: "Active",
	//     split: 0.02
	// },
	// {
	//     id: "6",
	//     firstName: "Olivia",
	//     lastName: "Martinez",
	//     email: "olivia.martinez@travelhub.com",
	//     role: "Customer Support",
	//     status: "Inactive",
	//     split: null
	// },
	// {
	//     id: "7",
	//     firstName: "Daniel",
	//     lastName: "Smith",
	//     email: "daniel.smith@travelhub.com",
	//     role: "Finance Manager",
	//     status: "Active",
	//     split: 0.005
	// },
	// {
	//     id: "8",
	//     firstName: "Sophia",
	//     lastName: "Taylor",
	//     email: "sophia.taylor@travelhub.com",
	//     role: "Partner Manager",
	//     status: "Active",
	//     split: null
	// },
	// {
	//     id: "9",
	//     firstName: "James",
	//     lastName: "Wilson",
	//     email: "james.wilson@travelhub.com",
	//     role: "Regional Manager",
	//     status: "Inactive",
	//     split: 0.01
	// },
	// {
	//     id: "10",
	//     firstName: "Isabella",
	//     lastName: "Davis",
	//     email: "isabella.davis@travelhub.com",
	//     role: "Super Admin",
	//     status: "Active",
	//     split: 0.015
	// }
];
