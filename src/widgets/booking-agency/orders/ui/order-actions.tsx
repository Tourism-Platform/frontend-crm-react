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

import type { IOrder } from "@/entities/booking";

interface IOrderActionsProps {
	order?: IOrder;
	onEdit?: (id: string, data: Partial<IOrder>) => void;
	onDelete?: (id: string) => void;
}

export const OrderActions: FC<IOrderActionsProps> = ({
	order,
	onEdit,
	onDelete
}) => {
	const { t } = useTranslation("orders_page");

	if (!order) return null;

	const handleEdit = () => {
		if (onEdit) {
			onEdit(order.orderId, order);
		}
	};

	const handleDelete = () => {
		if (onDelete) {
			onDelete(order.orderId);
		}
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
					{t("menu.edit")}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={handleDelete}
					className="text-destructive focus:text-destructive"
				>
					{t("menu.delete")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
