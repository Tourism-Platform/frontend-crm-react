import { type FC } from "react";

import { Badge, type BadgeVariant } from "@/shared/ui";
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
		<div className="flex justify-between items-center w-full">
			<h1 className="text-3xl">
				{orderId} - {client}
			</h1>
			<Badge
				variant={variant}
				className="text-lg px-4 py-1 flex items-center gap-1"
			>
				<span>
					{isNegative ? "-" : ""}
					{formatToDollars(variance)}
				</span>
			</Badge>
		</div>
	);
};
