import { Loader2 } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import {
	ENUM_TOUR_STATUS,
	// useArchiveTourMutation,
	useGetTourGeneralQuery,
	usePublishTourMutation
} from "@/entities/tour";

export const PublishTourButton: FC = () => {
	const { t } = useTranslation("common_tours");
	const { tourId = "" } = useParams<{ tourId: string }>();
	const { data: tour, isLoading: isTourLoading } = useGetTourGeneralQuery(
		tourId,
		{
			skip: !tourId
		}
	);

	const [publishTour, { isLoading: isPublishLoading }] =
		usePublishTourMutation();
	// const [archiveTour, { isLoading: isArchiveLoading }] =
	// 	useArchiveTourMutation();

	const isPublished = tour?.status === ENUM_TOUR_STATUS.PUBLISHED;

	const { action, label, loadingLabel, tostMessage } = {
		action: isPublished ? publishTour : publishTour,
		label: isPublished ? t("actions.archive") : t("actions.publish"),
		loadingLabel: isPublished
			? t("actions.archiving")
			: t("actions.publishing"),
		tostMessage: {
			success: isPublished
				? t("toast.archive.success")
				: t("toast.publish.success"),
			error: isPublished
				? t("toast.archive.error")
				: t("toast.publish.error")
		}
	};
	const handlePublish = async () => {
		if (!tourId) return;
		try {
			await action(tourId).unwrap();
			toast.success(tostMessage.success);
		} catch {
			toast.error(tostMessage.error);
		}
	};
	const isLoading = isPublishLoading || isPublishLoading || isTourLoading;

	return (
		<Button onClick={handlePublish} disabled={isLoading}>
			{isLoading ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					{loadingLabel}
				</>
			) : (
				label
			)}
		</Button>
	);
};
