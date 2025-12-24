import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { ENUM_FORM_LANDING } from "../../model";

export const AdditionalInfoBlock: FC = () => {
	const { t } = useTranslation("landing_page");
	const { control } = useFormContext();

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg font-medium">
				{t("blocks.additional_info.title")}
			</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.additional_info.description")}
			</p>
			<CustomField
				name={ENUM_FORM_LANDING.ADDITIONAL_INFO}
				control={control}
				label={t("blocks.additional_info.fields.additional_info.label")}
				fieldType="editor"
				t={t}
			/>
		</div>
	);
};
