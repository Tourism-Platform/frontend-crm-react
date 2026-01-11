import { Loader } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import { useGetActivityLogQuery } from "@/entities/tour";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import { ActivityLogContent } from "./activity-log-content";
import { ActivityLogSkeleton } from "./activity-log-skeleton";

export const ActivityLog: FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const [page, setPage] = useState(1);
	const limit = 5;

	const {
		data,
		isLoading: isActivityLogLoading,
		isFetching,
		isError: isActivityLogError
	} = useGetActivityLogQuery(
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

	useEffect(() => {
		if (isActivityLogError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isActivityLogError, t]);

	const activities = data?.data || [];
	const total = data?.total || 0;
	const hasMore = activities.length < total;

	const handleLoadMore = () => {
		setPage((prev) => prev + 1);
	};

	return (
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader
				title={t("page_name")}
				actions={
					<>
						<PreviewTourButton />
						<PublishTourButton />
					</>
				}
			/>

			<Card>
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="text-xl font-normal">
						{t("content.title")}
					</CardTitle>
					<Button variant="outline">{t("actions.export")}</Button>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					{!isActivityLogLoading && (
						<ActivityLogContent items={activities} />
					)}

					{(isFetching || isActivityLogLoading) && (
						<ActivityLogSkeleton />
					)}

					{hasMore && (
						<div className="flex justify-center pb-4">
							<Button
								variant="outline"
								onClick={handleLoadMore}
								disabled={isFetching || isActivityLogError}
							>
								{isFetching && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isFetching
									? t("buttons.loading")
									: t("buttons.load")}
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</section>
	);
};
