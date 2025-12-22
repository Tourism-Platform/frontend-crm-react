import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import { type IReconciliationDetail } from "@/entities/finance";

import { getStatsItems } from "../model";

interface IReconciliationStatsProps {
	data: IReconciliationDetail;
}

export const ReconciliationStats: FC<IReconciliationStatsProps> = ({
	data
}) => {
	const { t } = useTranslation("reconciliation_id_page");

	const stats = getStatsItems(data, t);

	return (
		<div className="grid grid-cols-3 gap-6">
			{stats.map((stat, index) => (
				<Card key={index}>
					<CardContent>
						<div className="flex flex-col gap-2">
							<span className="text-sm text-gray-500">
								{stat.label}
							</span>
							<span className="text-4xl">
								{formatToDollars(stat.value)}
							</span>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
