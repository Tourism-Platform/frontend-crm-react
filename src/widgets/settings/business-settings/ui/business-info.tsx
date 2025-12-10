import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { BUSINESS_DATA_LIST, type TChangeBusinessSchema } from "../model";

interface IBusinessInfoProps {
	form: UseFormReturn<TChangeBusinessSchema>;
}

export const BusinessInfo: FC<IBusinessInfoProps> = ({ form }) => {
	const { t } = useTranslation("business_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.business.title")}</h2>
			<div className="grid  gap-x-4 gap-y-1">
				{BUSINESS_DATA_LIST.map(({ key, ...item }) => (
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
