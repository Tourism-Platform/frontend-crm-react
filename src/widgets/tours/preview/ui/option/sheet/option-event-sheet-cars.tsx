import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { VEHICLE_BODY_TYPE_LABELS } from "@/entities/tour";
import type { IOptionEventSheetCar } from "@/entities/tour/preview-tour";

import { getSheetCarIcon } from "../../../model";

import { OptionEventSheetItemCard } from "./option-event-sheet-item-card";

interface IOptionEventSheetCarsProps {
	cars: IOptionEventSheetCar[];
}

export const OptionEventSheetCars: FC<IOptionEventSheetCarsProps> = ({
	cars
}) => {
	const { t } = useTranslation(["preview_option_page", "options"]);

	if (!cars.length) return null;

	return (
		<div>
			<h4 className="font-semibold mb-3">{t("sheet.cars")}</h4>
			<div className="flex flex-col gap-3">
				{cars.map((car, index) => {
					const title = car.typ
						? t(VEHICLE_BODY_TYPE_LABELS[car.typ], {
								ns: "options"
							})
						: "";

					return (
						<OptionEventSheetItemCard
							key={`${car.typ ?? "car"}-${index}`}
							icon={getSheetCarIcon(car.typ)}
							title={title}
							badgeCount={car.pax}
							badgeLabel={
								car.pax != null
									? t("sheet.pax", { count: car.pax })
									: undefined
							}
							description={car.description}
						/>
					);
				})}
			</div>
		</div>
	);
};
