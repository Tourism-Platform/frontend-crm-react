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

import type { TOperatorPaymentRoute } from "@/entities/finance";

import { DeletePaymentRoute, EditPaymentRoute } from "@/features/settings";

interface IPaymentRouteActionsProps {
	route: TOperatorPaymentRoute;
}

export const PaymentRouteActions: FC<IPaymentRouteActionsProps> = ({
	route
}) => {
	const { t } = useTranslation("financial_settings_page_operator");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex justify-end">
					<Button size="icon" variant="ghost" aria-label="Edit route">
						<EllipsisIcon size={16} aria-hidden="true" />
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<EditPaymentRoute
						route={route}
						trigger={
							<div className="w-full hover:bg-accent cursor-pointer px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
								{t("payment_settings.actions.edit")}
							</div>
						}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeletePaymentRoute
						id={route.id}
						trigger={
							<div className="w-full cursor-pointer px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
								{t("payment_settings.actions.delete")}
							</div>
						}
						className="text-destructive focus:text-destructive hover:bg-accent"
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
