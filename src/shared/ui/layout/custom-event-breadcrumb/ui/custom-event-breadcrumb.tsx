import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { matchPath, useLocation, useParams } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { BreadcrumbPills } from "@/shared/ui";

import { BREADCRUMB_LIST } from "../model";

export const CustomEventBreadcrumb: FC = () => {
	const { t } = useTranslation("common_events");
	const { tourId = "" } = useParams<{ tourId: string }>();
	const location = useLocation();
	const currentPath = Object.values(ENUM_PATH.TOURS.EVENTS).find((item) =>
		matchPath(item, location.pathname)
	);

	if (!currentPath) return null;

	const itineraryHref = buildRoute(ENUM_PATH.TOURS.ITINERARY, { tourId });

	return (
		<div className="px-0">
			<BreadcrumbPills
				items={[
					{
						key: "itinerary",
						label: t(BREADCRUMB_LIST[ENUM_PATH.TOURS.EVENTS.ROOT]),
						to: itineraryHref,
						isCurrent: false
					},
					{
						key: "event",
						label: t(BREADCRUMB_LIST[currentPath]),
						isCurrent: true
					}
				]}
			/>
		</div>
	);
};
