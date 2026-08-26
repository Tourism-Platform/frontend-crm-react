import { type FC } from "react";

import { Badge, type BadgeVariant, useSetBreadcrumbLabels } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

interface IReconciliationHeaderProps {
	orderId: string;
	variance: number;
}

export const ReconciliationHeader: FC<IReconciliationHeaderProps> = ({
	orderId,
	variance
}) => {
	useSetBreadcrumbLabels([orderId]);

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
			<h1 className="text-3xl">{orderId}</h1>
			<Badge
				variant={variant}
				className="text-lg px-4 py-1 flex items-center gap-1"
			>
				<span>{formatToDollars(variance)}</span>
			</Badge>
		</div>
	);
};
