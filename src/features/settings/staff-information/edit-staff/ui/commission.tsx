import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { COMMISSION_LIST, type TEditStaffSchema } from "../model";

interface ICommissionProps {
	form: UseFormReturn<TEditStaffSchema>;
}

export const Commission: FC<ICommissionProps> = ({ form }) => {
	const { t } = useTranslation("staff_information_page");

	return (
		<div className="space-y-5">
			<div>
				<h3 className="text-base font-semibold">
					{t("menu.edit.form.commission.title")}
				</h3>
				<p className="text-sm text-muted-foreground">
					{t("menu.edit.form.commission.description")}
				</p>
			</div>
			<div className="grid grid-cols-2 gap-x-6">
				{COMMISSION_LIST().map(({ key, ...item }) => (
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
