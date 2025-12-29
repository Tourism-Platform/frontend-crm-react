import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import type { TAccountSchema } from "@/entities/user";

import { GENERAL_ACCOUNT_DATA_LIST } from "../model";

interface IGeneralInfoProps {
	form: UseFormReturn<TAccountSchema>;
}

export const GeneralInfo: FC<IGeneralInfoProps> = ({ form }) => {
	const { t } = useTranslation("account_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.general.title")}</h2>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				{GENERAL_ACCOUNT_DATA_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={key}
						t={t}
						{...item}
					/>
				))}
			</div>
		</div>
	);
};
