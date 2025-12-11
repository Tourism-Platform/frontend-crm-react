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

import { DeleteCommissionType, EditCommissionType } from "@/features/settings";

export const FinancialActions: FC = () => {
	const { t } = useTranslation("financial_settings_page");
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
					<EditCommissionType
						trigger={
							<div className=" hover:bg-accent">
								{t("commission_type.menu.edit.button")}
							</div>
						}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeleteCommissionType
						trigger={
							<div>{t("commission_type.menu.delete.button")}</div>
						}
						className="text-destructive focus:text-destructive hover:bg-accent"
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
