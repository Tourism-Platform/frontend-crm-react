import { EllipsisIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

import type { IStaffUser } from "@/entities/staff";

import { DeleteStaff, EditStaff } from "@/features/settings";

interface IStaffActionsProps {
	user?: IStaffUser;
	onEdit?: (id: string, data: Partial<IStaffUser>) => void;
	onDelete?: (id: string) => void;
}

export const StaffActions: FC<IStaffActionsProps> = ({
	user,
	onEdit,
	onDelete
}) => {
	const { t } = useTranslation("staff_information_page");

	if (!user) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex justify-end">
					<Button
						size="icon"
						variant="ghost"
						className="shadow-none"
						aria-label="Edit item"
					>
						<EllipsisIcon size={16} aria-hidden="true" />
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
					<EditStaff
						trigger={
							<div className="w-full h-full cursor-pointer hover:bg-accent px-2 py-1.5 text-sm">
								{t("menu.edit.button")}
							</div>
						}
						user={user}
						onEdit={onEdit}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
					<DeleteStaff
						trigger={
							<div className="w-full h-full cursor-pointer text-destructive focus:text-destructive hover:bg-accent px-2 py-1.5 text-sm">
								{t("menu.delete.button")}
							</div>
						}
						className="w-full justify-start px-2 py-1.5"
						id={user.id}
						onDelete={onDelete}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
