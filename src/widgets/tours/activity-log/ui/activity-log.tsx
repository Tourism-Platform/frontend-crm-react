import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Button, Card, CardContent } from "@/shared/ui";

import { TourHeader, useGetActivityLogQuery } from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { ActivityLogContent } from "./activity-log-content";
import { ActivityLogSkeleton } from "./activity-log-skeleton";

export const ActivityLog: FC = () => {
	const { tourId } = useParams<{ tourId: string }>();
	const [page, setPage] = useState(1);
	const limit = 5;

	const { data, isLoading, isFetching } = useGetActivityLogQuery(
		{
			tourId,
			page,
			limit
		},
		{
			skip: !tourId
		}
	);
	const { t } = useTranslation("tour_activity_log_page");

	const activities = data?.data || [];
	const total = data?.total || 0;
	const hasMore = activities.length < total;

	const handleLoadMore = () => {
		setPage((prev) => prev + 1);
	};

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
				<CardContent className="flex flex-col gap-6">
					<ActivityLogContent items={activities} />

					{(isLoading || isFetching) && <ActivityLogSkeleton />}

					{hasMore && (
						<div className="flex justify-center pb-4">
							<Button variant="outline" onClick={handleLoadMore}>
								{t("actions.load_more")}
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</section>
	);
};
