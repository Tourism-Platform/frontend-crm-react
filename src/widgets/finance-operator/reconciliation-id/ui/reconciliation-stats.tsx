import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import { type IReconciliationDetail } from "@/entities/finance";

import { getStatsItems } from "../model";

interface IReconciliationStatsProps {
	data: IReconciliationDetail;
}

const ReconciliationStatsBase: FC<IReconciliationStatsProps> = ({ data }) => {
	const { t } = useTranslation("reconciliation_id_page");

	const stats = useMemo(() => getStatsItems(data, t), [data, t]);

	return (
		<div className="grid grid-cols-3 gap-6">
			{stats.map((stat, index) => (
				<Card key={index} className="gap-3">
					<CardHeader className="block">
						<CardTitle className="text-lg font-medium text-muted-foreground">
							{stat.label}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<span className="text-4xl">
							{formatToDollars(stat.value)}
						</span>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export const ReconciliationStats = withErrorBoundary(ReconciliationStatsBase);
