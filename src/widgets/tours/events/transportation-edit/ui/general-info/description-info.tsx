import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField, withErrorBoundary } from "@/shared/ui";

import type { TTransportationEditSchema } from "@/entities/tour";

import { ENUM_FORM_SECTION, TRANSPORTATION_DESCRIPTION } from "../../model";

interface IDescriptionInfoProps {
	form: UseFormReturn<TTransportationEditSchema>;
}

const DescriptionInfoBase: FC<IDescriptionInfoProps> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");
	const { key, ...rest } = TRANSPORTATION_DESCRIPTION;
	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.general.description.title")}</h2>
			<CustomField
				control={form?.control}
				name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
				{...rest}
				t={t}
			/>
		</div>
	);
};

export const DescriptionInfo = withErrorBoundary(DescriptionInfoBase);
