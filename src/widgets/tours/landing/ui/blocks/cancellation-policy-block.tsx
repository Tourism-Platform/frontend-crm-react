import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { ENUM_FORM_LANDING } from "../../model";

export const CancellationPolicyBlock: FC = () => {
	const { t } = useTranslation("landing_page");
	const { control } = useFormContext();

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg ">{t("blocks.cancellation.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.cancellation.description")}
			</p>
			<CustomField
				name={ENUM_FORM_LANDING.CANCELLATION_POLICY}
				control={control}
				label={t(
					"blocks.cancellation.fields.cancellation_policy.label"
				)}
				fieldType="editor"
				t={t}
			/>
		</div>
	);
};
