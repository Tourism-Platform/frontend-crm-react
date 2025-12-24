import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Badge, type BadgeVariant, Button } from "@/shared/ui";

import {
	type ENUM_ORDER_STATUS_TYPE,
	ORDER_STATUS_LABELS,
	ORDER_STATUS_VARIANTS
} from "@/entities/booking";

interface IOrderHeaderProps {
	orderId: string;
	status: ENUM_ORDER_STATUS_TYPE;
}

export const OrderHeader: FC<IOrderHeaderProps> = ({ orderId, status }) => {
	const { t } = useTranslation("order_id_page");

	const getStatusVariant = (status: ENUM_ORDER_STATUS_TYPE): BadgeVariant => {
		return (ORDER_STATUS_VARIANTS[status] as BadgeVariant) || "default";
	};

	return (
		<div className="grid gap-5">
			<div>
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="text-primary"
				>
					<Link to={ENUM_PATH.BOOKING.ORDERS}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
			</div>
			<div className="grid gap-2">
				<div className="flex items-center justify-between">
					<div className="flex gap-3">
						<h1 className="text-3xl">{orderId}</h1>
						<Badge
							variant={getStatusVariant(status)}
							className={cn(
								"px-3 py-2 text-xs font-bold uppercase rounded-md"
							)}
						>
							{t(ORDER_STATUS_LABELS[status])}
						</Badge>
					</div>
					<Button>{t("buttons.accept")}</Button>
				</div>
			</div>
		</div>
	);
};
