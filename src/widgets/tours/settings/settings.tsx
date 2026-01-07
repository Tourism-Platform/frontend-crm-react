import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator
} from "@/shared/ui";

import { TourHeader, useGetTourGeneralQuery } from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { TourNotFound } from "../tour-not-found";

import { SETTINGS_TABS_LIST } from "./model";

export const Settings: FC = () => {
	const { t } = useTranslation("tour_settings_page");
	const { tourId } = useParams<{ tourId: string }>();

	const {
		data: tour,
		isError,
		isLoading
	} = useGetTourGeneralQuery(tourId as string, {
		skip: !tourId
	});

	if ((isError || !tour) && !isLoading) {
		return <TourNotFound />;
	}

	return (
		<section className="flex flex-col gap-6">
			<TourHeader
				title={t("page_name", {
					name: tour?.tourTitle || ""
				})}
				badgeText="Planning"
				duration="6 days / 5 nights"
				type={tour?.tourType || "Group"}
				actions={
					<>
						<PreviewTourButton />
						<PublishTourButton />
					</>
				}
			/>
			<Card>
				<CardContent>
					<CustomOptionTabs
						defaultValue={SETTINGS_TABS_LIST[0]?.type}
					>
						<CustomOptionTabsList className="grid-cols-2">
							{SETTINGS_TABS_LIST.map((item) => (
								<CustomOptionTabsTrigger
									key={item.type}
									value={item.type}
									variant={"tongue"}
								>
									{t(item?.label)}
								</CustomOptionTabsTrigger>
							))}
						</CustomOptionTabsList>
						<Separator className="mb-6" />
						{SETTINGS_TABS_LIST.map((item) => (
							<CustomOptionTabsContent
								key={item.type}
								value={item.type}
							>
								<item.slot />
							</CustomOptionTabsContent>
						))}
					</CustomOptionTabs>
				</CardContent>
			</Card>
		</section>
	);
};
