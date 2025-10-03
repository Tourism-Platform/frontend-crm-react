import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { RECENT_ORDERS_MOCK } from "@/shared/config";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import { ORDER_HISTORY_COLUMNS } from "../model";

export const OrderHistory: FC = () => {
	const { t } = useTranslation("tour_order_history_page");
	return (
		<section className="flex flex-col gap-6 container">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl">{t("page_name")}: TOUR NAME</h1>
			</div>
			<Card>
				<CardContent>
					<CustomTable
						data={RECENT_ORDERS_MOCK}
						columns={ORDER_HISTORY_COLUMNS()}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
