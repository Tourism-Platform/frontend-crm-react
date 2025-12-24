import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	TOUR_INCLUDED_OPTIONS,
	TOUR_NOT_INCLUDED_OPTIONS
} from "@/shared/config";
import { CustomField } from "@/shared/ui";

import { ENUM_FORM_LANDING } from "../../model";

export const AmenitiesBlock: FC = () => {
	const { t } = useTranslation("landing_page");
	const { control } = useFormContext();

	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-lg ">{t("blocks.amenities.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.amenities.description")}
			</p>

			<CustomField
				name={ENUM_FORM_LANDING.INCLUDED}
				control={control}
				label={t("blocks.amenities.fields.included.label")}
				placeholder="blocks.amenities.fields.included.placeholder"
				fieldType="multiselect"
				options={TOUR_INCLUDED_OPTIONS}
				displayMode="badge"
				badgeVariant="green"
				hideClearAllButton
				t={t}
			/>

			<CustomField
				name={ENUM_FORM_LANDING.NOT_INCLUDED}
				control={control}
				label={t("blocks.amenities.fields.not_included.label")}
				placeholder="blocks.amenities.fields.not_included.placeholder"
				fieldType="multiselect"
				options={TOUR_NOT_INCLUDED_OPTIONS}
				displayMode="badge"
				badgeVariant="red"
				hideClearAllButton
				t={t}
			/>
		</div>
	);
};
