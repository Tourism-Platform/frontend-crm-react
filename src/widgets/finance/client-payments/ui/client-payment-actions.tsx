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

import { ENUM_PAYMENT_STATUS, type IPayment } from "@/entities/finance";

import { AssignPayment, DeletePayment } from "@/features/finance";

interface IClientPaymentActionsProps {
	payment?: IPayment;
	onAssign?: (id: string, data: Partial<IPayment>) => void;
	onDelete?: (id: string) => void;
}

export const ClientPaymentActions: FC<IClientPaymentActionsProps> = ({
	payment,
	onAssign,
	onDelete
}) => {
	const { t } = useTranslation("client_payments_page");

	if (!payment) return null;

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
				<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
					<AssignPayment
						trigger={
							<div className="w-full h-full cursor-pointer hover:bg-accent px-2 py-1.5 text-sm">
								{payment.status === ENUM_PAYMENT_STATUS.ASSIGNED
									? t("table.menu.open")
									: t("table.menu.assign")}
							</div>
						}
						payment={payment}
						onAssign={onAssign}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
					<DeletePayment
						trigger={
							<div className="w-full h-full cursor-pointer text-destructive focus:text-destructive hover:bg-accent px-2 py-1.5 text-sm">
								{t("table.menu.delete")}
							</div>
						}
						className="w-full justify-start px-2 py-1.5"
						id={payment.id}
						onDelete={onDelete}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
