import { Coffee, Dumbbell, type LucideIcon, Star, Wifi } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	ACCOMMODATION_AMENITIES_LABELS,
	ENUM_ACCOMMODATION_AMENITY,
	type ENUM_ACCOMMODATION_AMENITY_TYPE
} from "@/entities/tour";

const AMENITY_ICONS: Partial<
	Record<ENUM_ACCOMMODATION_AMENITY_TYPE, LucideIcon>
> = {
	[ENUM_ACCOMMODATION_AMENITY.WIFI]: Wifi,
	[ENUM_ACCOMMODATION_AMENITY.GYM]: Dumbbell,
	[ENUM_ACCOMMODATION_AMENITY.RESTAURANT]: Coffee,
	[ENUM_ACCOMMODATION_AMENITY.SPA]: Star,
	[ENUM_ACCOMMODATION_AMENITY.BREAKFAST]: Coffee,
	[ENUM_ACCOMMODATION_AMENITY.POOL]: Star
};

interface IOptionEventSheetAmenitiesProps {
	amenities: ENUM_ACCOMMODATION_AMENITY_TYPE[];
}

export const OptionEventSheetAmenities: FC<IOptionEventSheetAmenitiesProps> = ({
	amenities
}) => {
	const { t } = useTranslation(["preview_option_page", "options"]);

	if (!amenities.length) return null;

	return (
		<div>
			<h4 className="font-semibold mb-3">{t("sheet.amenities")}</h4>
			<div className="flex flex-wrap gap-4">
				{amenities.map((amenity) => {
					const Icon = AMENITY_ICONS[amenity] ?? Wifi;
					return (
						<div
							key={amenity}
							className="flex items-center gap-2 text-sm"
						>
							<Icon className="w-4 h-4 text-primary shrink-0" />
							<span>
								{t(ACCOMMODATION_AMENITIES_LABELS[amenity], {
									ns: "options"
								})}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
