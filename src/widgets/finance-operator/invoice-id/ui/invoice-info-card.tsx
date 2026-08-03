import { type FC } from "react";

import { Card, CardContent, CardHeader } from "@/shared/ui";

import { type IInfoItem } from "../model";

interface IInvoiceInfoCardProps {
	title: string;
	items: IInfoItem[];
}

export const InvoiceInfoCard: FC<IInvoiceInfoCardProps> = ({
	title,
	items
}) => {
	return (
		<Card className="gap-2">
			<CardHeader className="text-lg font-semibold block">
				{title}
			</CardHeader>
			<CardContent className="grid grid-flow-row gap-1.5 text-xs font-medium text-md">
				{items.map((item, index) => (
					<div key={index} className="flex gap-2">
						<span className="text-muted-foreground">
							{item.label}:
						</span>
						<span>{item.value}</span>
					</div>
				))}
			</CardContent>
		</Card>
	);
};
