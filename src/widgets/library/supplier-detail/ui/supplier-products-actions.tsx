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

import { ENUM_SUPPLIER_TYPE, type TSupplierProduct } from "@/entities/supplier";

import { DeleteSupplierProduct } from "@/features/library";

interface ISupplierProductsActionsProps {
	supplierId: string;
	item?: TSupplierProduct;
}

export const SupplierProductsActions: FC<ISupplierProductsActionsProps> = ({
	supplierId,
	item
}) => {
	const { t } = useTranslation("supplier_id_page");
	const navigate = useNavigate();

	if (!item) return null;

	const handleEdit = () => {
		const path =
			item.typ === ENUM_SUPPLIER_TYPE.TRAIN
				? ENUM_PATH.LIBRARY.SUPPLIER_TRAIN_PRODUCT
				: ENUM_PATH.LIBRARY.SUPPLIER_HOTEL_PRODUCT;

		navigate(
			buildRoute(path, {
				supplierId,
				productId: item.id
			})
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
				<DropdownMenuItem onClick={handleEdit}>
					{t("products.menu.edit.button")}
				</DropdownMenuItem>
				<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
					<DeleteSupplierProduct
						supplierId={supplierId}
						productId={item.id}
						ns="supplier_id_page"
						trigger={
							<div className="w-full h-full cursor-pointer text-destructive focus:text-destructive hover:bg-accent px-2 py-1.5 text-sm">
								{t("products.menu.delete.button")}
							</div>
						}
						className="w-full justify-start px-2 py-1.5"
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
