import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import type { TEditStaffSchema } from "@/entities/staff";

import { PERSONAL_DETAILS_LIST } from "../model";

interface IPersonalDetailsProps {
	form: UseFormReturn<TEditStaffSchema>;
}

export const PersonalDetails: FC<IPersonalDetailsProps> = ({ form }) => {
	const { t } = useTranslation("staff_information_page");

	return (
		<div className="space-y-5">
			<div>
				<h3 className="text-lg">{t("menu.edit.form.details.title")}</h3>
				<p className="text-sm text-muted-foreground">
					{t("menu.edit.form.details.description")}
				</p>
			</div>
			<div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
				{PERSONAL_DETAILS_LIST().map(({ key, ...item }) => (
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
