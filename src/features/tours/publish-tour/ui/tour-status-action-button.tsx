import { Loader } from "lucide-react";
import { type FC } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/shared/ui";

import { ENUM_TOUR_STATUS, useGetTourGeneralQuery } from "@/entities/tour";

import { ArchiveTourButton } from "./archive-tour-button";
import { PublishTourButton } from "./publish-tour-button";
import { UnarchiveTourButton } from "./unarchive-tour-button";

export const TourStatusActionButton: FC = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const { data: tour, isLoading } = useGetTourGeneralQuery(tourId, {
		skip: !tourId
	});

	if (!tourId || isLoading) {
		return (
			<Button disabled>
				<Loader className="h-4 w-4 animate-spin" />
			</Button>
		);
	}

	switch (tour?.status) {
		case ENUM_TOUR_STATUS.PUBLISHED:
			return <ArchiveTourButton tourId={tourId} />;
		case ENUM_TOUR_STATUS.ARCHIVED:
			return <UnarchiveTourButton tourId={tourId} />;
		default:
			return <PublishTourButton tourId={tourId} />;
	}
};
