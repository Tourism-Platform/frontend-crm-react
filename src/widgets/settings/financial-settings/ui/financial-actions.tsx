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

import type { ICommission } from "@/entities/commission";

import { DeleteCommissionType, EditCommissionType } from "@/features/settings";

interface IFinancialActionsProps {
	row: ICommission;
}

export const FinancialActions: FC<IFinancialActionsProps> = ({ row }) => {
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
						id={row.id}
						data={row}
						trigger={
							<div className="w-full hover:bg-accent cursor-pointer px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
								{t("commission_type.menu.edit.button")}
							</div>
						}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeleteCommissionType
						id={row.id}
						trigger={
							<div className="w-full cursor-pointer px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
								{t("commission_type.menu.delete.button")}
							</div>
						}
						className="text-destructive focus:text-destructive hover:bg-accent"
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
