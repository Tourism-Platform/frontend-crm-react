import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

interface IOrderReportProps {
	report: string;
}

export const OrderReport: FC<IOrderReportProps> = ({ report }) => {
	const { t } = useTranslation("order_id_page");

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("report.title")}</CardTitle>
			</CardHeader>
			<CardContent className="min-h-[200px]">
				<p className="whitespace-pre-wrap">{report}</p>
			</CardContent>
		</Card>
	);
};
