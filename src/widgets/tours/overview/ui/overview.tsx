import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import { ConnectedTourHeader } from "@/features/tours";
import { PreviewTourButton, PublishTourButton } from "@/features/tours";

// import { RecentActivityLog } from "./recent-activity-log";
import { LastOrders } from "./resent-orders";
import { TourInfo } from "./tour-info";

const OverviewBase: FC = () => {
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
		<section className="flex flex-1 flex-col gap-5">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />

			<TourInfo />
			<LastOrders />
			{/* <RecentActivityLog /> */}
		</section>
	);
};

export const Overview = withErrorBoundary(OverviewBase);
