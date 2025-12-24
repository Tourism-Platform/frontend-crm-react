import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { ACTIVITY_LOG_MOCK } from "@/shared/config";

import { TourHeader } from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { ActivityLogContent } from "./activity-log-content";

export const ActivityLog: FC = () => {
	const [activities] = useState(ACTIVITY_LOG_MOCK);
	const { t } = useTranslation("tour_activity_log_page");

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
			<ActivityLogContent items={activities} />
		</section>
	);
};
