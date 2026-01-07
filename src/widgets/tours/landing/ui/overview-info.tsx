import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { ENUM_FORM_LANDING, type TLandingSchema } from "@/entities/tour";

interface IOverviewInfoProps {
	form: UseFormReturn<TLandingSchema>;
}

export const OverviewInfo: FC<IOverviewInfoProps> = ({ form }) => {
	const { t } = useTranslation("landing_page");
	const { control } = form;

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg ">{t("blocks.overview.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.overview.description")}
			</p>
			<CustomField
				name={ENUM_FORM_LANDING.DESCRIPTION}
				control={control}
				label={t("blocks.overview.fields.description.label")}
				fieldType="editor"
				t={t}
			/>
		</div>
	);
};
