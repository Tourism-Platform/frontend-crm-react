import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, matchPath, useLocation, useParams } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Card,
	CardContent
} from "@/shared/ui";

import { BREADCRUMB_LIST } from "../model";

export const CustomEventBreadcrumb: FC = () => {
	const { t } = useTranslation("common_events");
	const { tourId = "" } = useParams<{ tourId: string }>();
	const location = useLocation();
	const currentPath = Object.values(ENUM_PATH.TOURS.EVENTS).find((item) =>
		matchPath(item, location.pathname)
	)!;
	return (
		<Card className="py-2">
			<CardContent>
				<Breadcrumb>
					<BreadcrumbList>
						<Link
							to={buildRoute(ENUM_PATH.TOURS.ITINERARY, {
								tourId
							})}
						>
							<BreadcrumbItem className="hidden md:block">
								{t(
									BREADCRUMB_LIST[ENUM_PATH.TOURS.EVENTS.ROOT]
								)}
							</BreadcrumbItem>
						</Link>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>
								{t(BREADCRUMB_LIST[currentPath])}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</CardContent>
		</Card>
	);
};
