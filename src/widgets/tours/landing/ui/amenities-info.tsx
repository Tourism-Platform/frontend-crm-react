import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField, withErrorBoundary } from "@/shared/ui";

import { ENUM_FORM_LANDING, type TLandingSchema } from "@/entities/tour";

interface IAmenitiesInfoProps {
	form: UseFormReturn<TLandingSchema>;
}

const AmenitiesInfoBase: FC<IAmenitiesInfoProps> = ({ form }) => {
	const { t } = useTranslation("landing_page");
	const { control } = form;

	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-lg ">{t("form.amenities.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("form.amenities.description")}
			</p>

			<CustomField
				name={ENUM_FORM_LANDING.INCLUDED}
				control={control}
				label={t("form.amenities.fields.included.label")}
				placeholder="form.amenities.fields.included.placeholder"
				fieldType="tags"
				badgeVariant="green"
				t={t}
			/>

			<CustomField
				name={ENUM_FORM_LANDING.NOT_INCLUDED}
				control={control}
				label={t("form.amenities.fields.not_included.label")}
				placeholder="form.amenities.fields.not_included.placeholder"
				fieldType="tags"
				badgeVariant="red"
				t={t}
			/>
		</div>
	);
};

export const AmenitiesInfo = withErrorBoundary(AmenitiesInfoBase);
