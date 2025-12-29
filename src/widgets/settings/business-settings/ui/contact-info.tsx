import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import type { TBusinessSchema } from "@/entities/user";

import { CONTACT_BUSINESS_DATA_LIST } from "../model";

interface IContactInfoProps {
	form: UseFormReturn<TBusinessSchema>;
}

export const ContactInfo: FC<IContactInfoProps> = ({ form }) => {
	const { t } = useTranslation("business_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.contact.title")}</h2>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				{CONTACT_BUSINESS_DATA_LIST.map(({ key, ...item }) => (
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
