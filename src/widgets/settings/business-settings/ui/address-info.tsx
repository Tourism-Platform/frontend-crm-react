import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import {
	ADDRESS_BUSINESS_DATA_LIST,
	type TChangeBusinessSchema
} from "../model";

interface IAddressInfoProps {
	form: UseFormReturn<TChangeBusinessSchema>;
}

export const AddressInfo: FC<IAddressInfoProps> = ({ form }) => {
	const { t } = useTranslation("business_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.legal.title")}</h2>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				{ADDRESS_BUSINESS_DATA_LIST.map((item, index) => (
					<CustomField
						className={index === 0 ? "col-span-2" : ""}
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
