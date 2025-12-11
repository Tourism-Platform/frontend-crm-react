import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { STAFF_USERS } from "@/shared/config/mocks";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import { type IStaffUser } from "@/entities/staff";

import { InviteStaff } from "@/features/settings";

import { COLUMNS } from "../model";

export const StaffInformation: FC = () => {
	const { t } = useTranslation("staff_information_page");
	const [users, setUsers] = useState<IStaffUser[]>(STAFF_USERS);

	const handleAddUser = (newUser: Omit<IStaffUser, "id">) => {
		const id = (
			Math.max(...users.map((u) => parseInt(u.id!))) + 1
		).toString();
		setUsers([
			...users,
			{
				...newUser,
				id
			}
		]);
	};

	const handleEditUser = (id: string, updatedUser: Partial<IStaffUser>) => {
		setUsers(
			users.map((user) =>
				user.id === id ? { ...user, ...updatedUser } : user
			)
		);
	};

	const handleDeleteUser = (id: string) => {
		setUsers(users.filter((user) => user.id !== id));
	};

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<CustomTable
						data={users}
						columns={COLUMNS(handleEditUser, handleDeleteUser)}
						actions={<InviteStaff onAdd={handleAddUser} />}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
