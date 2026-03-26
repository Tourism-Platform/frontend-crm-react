import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ConnectedTourHeader } from "@/features/tours";
import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { RecentActivityLog } from "./recent-activity-log";
import { LastOrders } from "./resent-orders";
import { TourInfo } from "./tour-info";

export const Overview: FC = () => {
	const { t } = useTranslation("tour_overview_page");

	const actionsJsx = useMemo(
		() => (
			<>
				<PreviewTourButton />
				<PublishTourButton />
			</>
		),
		[]
	);

	return (
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />

			<div className="grid gap-6">
				<TourInfo />
				<LastOrders />
				<RecentActivityLog />
			</div>
		</section>
	);
};
