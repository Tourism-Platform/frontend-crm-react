import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CustomTable } from "@/shared/ui";

import { RECENT_ORDERS_COLUMNS } from "../model";

export const LastOrders: FC = () => {
	const { t } = useTranslation("tour_overview_page");
	return (
		<Card>
			<CardContent>
				<div className="grid gap-3">
					<h2 className="text-xl">{t("recent_orders.title")}</h2>
					<CustomTable data={[]} columns={RECENT_ORDERS_COLUMNS()} />
				</div>
			</CardContent>
		</Card>
	);
};
