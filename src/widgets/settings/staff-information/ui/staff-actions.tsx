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

import { DeleteStaff, EditStaff } from "@/features/settings";

export const StaffActions: FC = () => {
	const { t } = useTranslation("staff_information_page");
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
				<DropdownMenuItem asChild>
					<EditStaff
						trigger={
							<div className=" hover:bg-accent">
								{t("menu.edit.button")}
							</div>
						}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeleteStaff
						trigger={<div>{t("menu.delete.button")}</div>}
						className="text-destructive focus:text-destructive hover:bg-accent"
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
