import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField, type Option } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	AMENITIES_INCLUDED_LABELS,
	AMENITIES_NOT_INCLUDED_LABELS,
	ENUM_FORM_LANDING,
	type TLandingSchema
} from "@/entities/tour";

interface IAmenitiesInfoProps {
	form: UseFormReturn<TLandingSchema>;
}

export const AmenitiesInfo: FC<IAmenitiesInfoProps> = ({ form }) => {
	const { t } = useTranslation("landing_page");
	const { control } = form;

	const includedOptions = useValueToTranslateLabel(
		AMENITIES_INCLUDED_LABELS
	) as Option[];
	const notIncludedOptions = useValueToTranslateLabel(
		AMENITIES_NOT_INCLUDED_LABELS
	) as Option[];

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
				options={includedOptions}
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
				options={notIncludedOptions}
				displayMode="badge"
				badgeVariant="red"
				hideClearAllButton
				t={t}
			/>
		</div>
	);
};
