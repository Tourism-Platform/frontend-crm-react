import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { FLIGHT_DESCRIPTION, type TGeneralInfoSchema } from "../../model";

interface IDescriptionInfoProps {
	form: UseFormReturn<TGeneralInfoSchema>;
}

export const DescriptionInfo: FC<IDescriptionInfoProps> = ({ form }) => {
	const { t } = useTranslation("flight_edit_page");
	const { key, ...rest } = FLIGHT_DESCRIPTION;
	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("general.description.title")}</h2>
			<CustomField control={form?.control} name={key} {...rest} t={t} />
		</div>
	);
};
