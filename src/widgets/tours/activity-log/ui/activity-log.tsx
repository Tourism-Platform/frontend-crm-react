import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	DataState,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import { useGetActivityLogQuery } from "@/entities/tour";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import { ActivityLogContent } from "./activity-log-content";

const ActivityLogBase: FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const [page, setPage] = useState(1);

	const {
		data,
		isLoading: isActivityLogLoading,
		isFetching,
		isRealError: isActivityLogError
	} = useOptionalResourceQuery(
		useGetActivityLogQuery(
			{
				page,
				limit: INTERSECTION_ELEMENTS.TOUR_ACTIVITY_LOG,
				tourId
			},
			{
				skip: !tourId
			}
		)
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

	const handleLoadMore = useCallback(() => {
		setPage((prev) => prev + 1);
	}, []);

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

			<Card>
				<CardHeader className="flex flex-wrap items-center justify-between gap-3">
					<CardTitle className="text-lg font-semibold">
						{t("content.title")}
					</CardTitle>
					<Button variant="outline">{t("actions.export")}</Button>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					{/* Догрузка страниц — на кнопке, список остаётся на месте */}
					<DataState
						data={activities}
						isLoading={isActivityLogLoading}
					>
						{(items) => <ActivityLogContent items={items} />}
					</DataState>

					{hasMore && (
						<div className="flex justify-center pb-4">
							<LoaderButton
								variant="outline"
								type="button"
								onClick={handleLoadMore}
								disabled={isFetching || isActivityLogError}
								isLoading={isFetching}
								label={t("buttons.load")}
								loadingLabel={t("buttons.loading")}
							/>
						</div>
					)}
				</CardContent>
			</Card>
		</section>
	);
};

export const ActivityLog = withErrorBoundary(ActivityLogBase);
