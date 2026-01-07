import { type FC } from "react";
import { useTranslation } from "react-i18next";

import type { TTourOverviewPageKeys } from "@/shared/config";
import { Card, CardContent, CardTitle } from "@/shared/ui";

interface IInfoCardProps {
	label: TTourOverviewPageKeys;
	value: string | number;
}

export const InfoCard: FC<IInfoCardProps> = ({ label, value }) => {
	const { t } = useTranslation("tour_overview_page");
	return (
		<Card>
			<CardContent className="grid gap-3">
				<p>{t(label)}:</p>
				<CardTitle className="text-5xl font-normal">{value}</CardTitle>
			</CardContent>
		</Card>
	);
};
