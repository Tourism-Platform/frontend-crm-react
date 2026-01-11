import { type FC } from "react";
import { useTranslation } from "react-i18next";

import type { TTourOverviewPageKeys } from "@/shared/config";
import { Card, CardContent, CardTitle, Skeleton } from "@/shared/ui";

interface IInfoCardProps {
	label: TTourOverviewPageKeys;
	value: string | number;
	isLoading?: boolean;
}

export const InfoCard: FC<IInfoCardProps> = ({ label, value, isLoading }) => {
	const { t } = useTranslation("tour_overview_page");
	return (
		<Card>
			<CardContent className="grid gap-3">
				<p>{t(label)}:</p>
				{isLoading ? (
					<Skeleton className="h-12 w-1/2" />
				) : (
					<CardTitle className="text-5xl font-normal">
						{value}
					</CardTitle>
				)}
			</CardContent>
		</Card>
	);
};
