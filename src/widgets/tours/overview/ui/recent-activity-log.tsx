import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import {
	ActivityLogItem,
	ActivityLogItemSkeleton,
	useGetActivityLogQuery
} from "@/entities/tour";

export const RecentActivityLog: FC = () => {
	const { t } = useTranslation("tour_overview_page");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const {
		data,
		isError: isActivityError,
		isLoading: isActivityLoading
	} = useGetActivityLogQuery(
		{
			tourId,
			page: 1,
			limit: 5
		},
		{
			skip: !tourId
		}
	);

	useEffect(() => {
		if (isActivityError) {
			toast.error(t("recent_activity.toasts.load.error"));
		}
	}, [isActivityError, t]);

	const activities = data?.data ?? [];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-normal">
					{t("recent_activity.title")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				{isActivityLoading ? (
					<div className="grid gap-6">
						{Array.from({ length: 5 }).map((_, index) => (
							<ActivityLogItemSkeleton key={index} />
						))}
					</div>
				) : (
					<div>
						{activities.map((item, index) => (
							<ActivityLogItem
								key={item.id}
								item={item}
								isLast={index === activities.length - 1}
							/>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};
