import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { Badge, type BadgeVariant, Button } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

interface IReconciliationHeaderProps {
	orderId: string;
	client: string;
	variance: number;
}

export const ReconciliationHeader: FC<IReconciliationHeaderProps> = ({
	orderId,
	client,
	variance
}) => {
	const { t } = useTranslation("reconciliation_id_page");
	const isPositive = variance > 0;
	const isNegative = variance < 0;

	let variant: BadgeVariant = "default";

	switch (true) {
		case isNegative:
			variant = "red";
			break;
		case isPositive:
			variant = "green";
			break;
		default:
			variant = "default";
			break;
	}

	return (
		<div>
			<div className="flex flex-col gap-4">
				<div>
					<Button
						variant="ghost"
						size="sm"
						asChild
						className="text-primary"
					>
						<Link to={ENUM_PATH.FINANCE.RECONCILIATION}>
							<ChevronLeft className="mr-2 h-4 w-4" />
							{t("buttons.back")}
						</Link>
					</Button>
				</div>

				<div className="flex justify-between items-center w-full">
					<h1 className="text-3xl">
						{orderId} - {client}
					</h1>
					<Badge
						variant={variant}
						className="text-lg px-4 py-1 flex items-center gap-1"
					>
						<span>{formatToDollars(variance)}</span>
					</Badge>
				</div>
			</div>
		</div>
	);
};
