import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { TourHeader } from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { Managers } from "./managers";
import { LastOrders } from "./resent-orders";
import { TourInfo } from "./tour-info";
import { TourSettings } from "./tour-settings";

export const Overview: FC = () => {
	const { t } = useTranslation("tour_overview_page");
	return (
		<section className="flex flex-col gap-6 container">
			<TourHeader
				title={`${t("page_name")}: Embark on an Unforgettable Archaeological Journey`}
				badgeText="Planning"
				duration="6 days / 5 nights"
				type="Group"
				actions={
					<>
						<PreviewTourButton />
						<PublishTourButton />
					</>
				}
			/>

			<div className="grid grid-cols-[1fr_400px] gap-6">
				<div className="grid gap-6">
					<TourInfo />
					<LastOrders />
				</div>
				<div>
					<div className="grid gap-6">
						<Managers />
						<TourSettings />
					</div>
				</div>
			</div>
		</section>
	);
};
