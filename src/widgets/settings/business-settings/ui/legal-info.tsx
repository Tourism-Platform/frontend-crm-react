import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { LEGAL_BUSINESS_DATA_LIST, type TChangeBusinessSchema } from "../model";

interface ILegalInfoProps {
	form: UseFormReturn<TChangeBusinessSchema>;
}

export const LegalInfo: FC<ILegalInfoProps> = ({ form }) => {
	const { t } = useTranslation("business_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.legal.title")}</h2>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				{LEGAL_BUSINESS_DATA_LIST.map((item) => (
					<CustomField
						key={item?.key}
						control={form?.control}
						name={item?.key}
						label={item?.label}
						placeholder={item?.placeholder}
						t={t}
					/>
				))}
			</div>
		</div>
	);
};
