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
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				<CustomField
					fieldType="textarea"
					className="col-span-2"
					control={form?.control}
					name={BUSINESS_DATA_LIST?.[0]?.key}
					label={BUSINESS_DATA_LIST?.[0]?.label}
					placeholder={BUSINESS_DATA_LIST?.[0]?.placeholder}
					t={t}
				/>
				{BUSINESS_DATA_LIST?.slice(1).map((item) => (
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
