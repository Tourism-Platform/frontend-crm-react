import { EllipsisIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

import type { ISupplier } from "@/entities/supplier";

import { DeleteSupplier } from "@/features/library";

interface ISuppliersActionsProps {
	item?: ISupplier;
}

export const SuppliersActions: FC<ISuppliersActionsProps> = ({ item }) => {
	const { t } = useTranslation("suppliers_page");
	const navigate = useNavigate();

	if (!item) return null;

	const handleOpen = () => {
		navigate(
			buildRoute(ENUM_PATH.LIBRARY.SUPPLIER, { supplierId: item.id })
		);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex justify-end">
					<Button
						size="icon"
						variant="ghost"
						className="shadow-none"
						aria-label="Actions"
					>
						<EllipsisIcon size={16} aria-hidden="true" />
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={handleOpen}>
					{t("menu.edit.button")}
				</DropdownMenuItem>
				<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
					<DeleteSupplier
						trigger={
							<div className="w-full h-full cursor-pointer text-destructive focus:text-destructive hover:bg-accent px-2 py-1.5 text-sm">
								{t("menu.delete.button")}
							</div>
						}
						className="w-full justify-start px-2 py-1.5"
						supplierId={item.id}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
