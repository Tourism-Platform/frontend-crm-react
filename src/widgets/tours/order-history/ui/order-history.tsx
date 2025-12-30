import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CustomTable } from "@/shared/ui";

import { TourHeader } from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { ORDER_HISTORY_COLUMNS } from "../model";

export const OrderHistory: FC = () => {
	const { t } = useTranslation("tour_order_history_page");
	return (
		<section className="flex flex-col gap-6 container">
			<TourHeader
				title={`${t("page_name")}: Embark on an Unforgettable Archaeological Journey`}
				badgeText="Planning"
				duration="6 days / 5 nights"
				type="Group"
				actions={
					<>
						<PreviewTourButton />
						<PublishTourButton />
					</>
				}
			/>
			<Card>
				<CardContent>
					<CustomTable data={[]} columns={ORDER_HISTORY_COLUMNS()} />
				</CardContent>
			</Card>
		</section>
	);
};
