import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
	Card,
	CardContent,
	CustomQueryTabs,
	withErrorBoundary
} from "@/shared/ui";

import { useGetTourGeneralQuery } from "@/entities/tour";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import { TourNotFound } from "../tour-not-found";

import { SETTINGS_TABS_LIST } from "./model";

const SettingsBase: FC = () => {
	const { t } = useTranslation("tour_settings_page");
	const { tourId } = useParams<{ tourId: string }>();

	const {
		data: tour,
		isError,
		isLoading
	} = useGetTourGeneralQuery(tourId || "", {
		skip: !tourId
	});

	const actionsJsx = useMemo(
		() => (
			<>
				<PreviewTourButton />
				<PublishTourButton />
			</>
		),
		[]
	);

	if ((isError || !tour) && !isLoading) {
		return <TourNotFound />;
	}

	return (
		<section className="flex flex-col gap-6">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />
			<Card>
				<CardContent>
					<CustomQueryTabs
						ns="tour_settings_page"
						tabs={SETTINGS_TABS_LIST}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

export const Settings = withErrorBoundary(SettingsBase);
