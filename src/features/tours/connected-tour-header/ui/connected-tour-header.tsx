import { type FC, type ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import {
	type ENUM_TOUR_STATUS_TYPE,
	type ENUM_TOUR_TYPES_TYPE,
	TOUR_STATUS_LABELS,
	TOUR_STATUS_VARIANTS,
	TOUR_TYPE_LABELS,
	TourHeader,
	useGetTourGeneralQuery
} from "@/entities/tour";

interface IConnectedTourHeaderProps {
	title: string;
	actions?: ReactNode;
}

export const ConnectedTourHeader: FC<IConnectedTourHeaderProps> = ({
	title,
	actions
}) => {
	const { t } = useTranslation(["options", "common_tours"]);
	const { tourId = "" } = useParams<{ tourId: string }>();

	const {
		data: tour,
		isLoading,
		isError
	} = useGetTourGeneralQuery(tourId, {
		skip: !tourId
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("toast.load.error", { ns: "common_tours" }));
		}
	}, [isError, t]);

	const daysLabel = t("tour.duration.days", { ns: "options" });
	const durationText =
		tour?.duration?.from === tour?.duration?.to
			? tour?.duration?.from + " " + daysLabel
			: tour?.duration?.from + "-" + tour?.duration?.to + " " + daysLabel;

	return (
		<TourHeader
			pageName={title}
			tourTitle={tour?.tourTitle}
			badgeText={t(
				TOUR_STATUS_LABELS[tour?.status as ENUM_TOUR_STATUS_TYPE],
				{ ns: "options" }
			)}
			badgeVariant={
				TOUR_STATUS_VARIANTS[tour?.status as ENUM_TOUR_STATUS_TYPE]
			}
			duration={durationText}
			type={t(TOUR_TYPE_LABELS[tour?.tourType as ENUM_TOUR_TYPES_TYPE], {
				ns: "options"
			})}
			actions={actions}
			isLoading={isLoading}
		/>
	);
};
