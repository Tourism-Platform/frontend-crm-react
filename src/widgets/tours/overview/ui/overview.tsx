import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { BoxOutlineIcon, ClockOutlineIcon } from "@/shared/assets";

import { Managers } from "./managers";
import { LastOrders } from "./resent-orders";
import { TourInfo } from "./tour-info";
import { TourSettings } from "./tour-settings";

export const Overview: FC = () => {
	const { t } = useTranslation("tour_overview_page");
	return (
		<section className="flex flex-col gap-6 container">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl">{t("page_name")}: TOUR NAME</h1>
				<div className="flex">
					<div className="grid grid-cols-2 justify-start items-center gap-5">
						<div className="flex gap-2 items-center">
							<ClockOutlineIcon className="h-4" />
							<p className="text-sm">6 days / 7 nights</p>
						</div>
						<div className="flex gap-2 items-center">
							<BoxOutlineIcon className="h-4" />
							<p className="text-sm">Regular trip</p>
						</div>
					</div>
				</div>
			</div>

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
