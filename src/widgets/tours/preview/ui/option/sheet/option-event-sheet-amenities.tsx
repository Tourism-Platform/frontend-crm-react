import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	ACCOMMODATION_AMENITIES_LABELS,
	type ENUM_ACCOMMODATION_AMENITY_TYPE
} from "@/entities/tour";

import { getSheetAmenityIcon } from "../../../model";

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
					const Icon = getSheetAmenityIcon(amenity);
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
