import { Bus, Car, type LucideIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	ENUM_VEHICLE_BODY_TYPE,
	type ENUM_VEHICLE_BODY_TYPE_TYPE,
	VEHICLE_BODY_TYPE_LABELS
} from "@/entities/tour";
import type { IOptionEventSheetCar } from "@/entities/tour/preview-tour";

import { OptionEventSheetItemCard } from "./option-event-sheet-item-card";

const CAR_ICONS: Record<ENUM_VEHICLE_BODY_TYPE_TYPE, LucideIcon> = {
	[ENUM_VEHICLE_BODY_TYPE.SEDAN]: Car,
	[ENUM_VEHICLE_BODY_TYPE.SUV]: Car,
	[ENUM_VEHICLE_BODY_TYPE.MINIVAN]: Car,
	[ENUM_VEHICLE_BODY_TYPE.MINIBUS]: Bus,
	[ENUM_VEHICLE_BODY_TYPE.MINIBUS_PLUS]: Bus,
	[ENUM_VEHICLE_BODY_TYPE.BUS]: Bus,
	[ENUM_VEHICLE_BODY_TYPE.COACH]: Bus
};

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
							icon={car.typ ? CAR_ICONS[car.typ] : Car}
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
