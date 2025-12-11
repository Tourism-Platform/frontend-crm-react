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
import type { TEditCommissionTypeSchema } from "@/features/settings";

interface IFinancialActionsProps {
	row: ICommission;
	onEdit: (id: string, data: TEditCommissionTypeSchema) => void;
	onDelete: (id: string) => void;
}

export const FinancialActions: FC<IFinancialActionsProps> = ({
	row,
	onEdit,
	onDelete
}) => {
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
						data={row}
						onEdit={(data) => onEdit(row.id, data)}
						trigger={
							<div className="w-full hover:bg-accent cursor-pointer">
								{t("commission_type.menu.edit.button")}
							</div>
						}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeleteCommissionType
						onDelete={() => onDelete(row.id)}
						trigger={
							<div className="w-full cursor-pointer">
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
