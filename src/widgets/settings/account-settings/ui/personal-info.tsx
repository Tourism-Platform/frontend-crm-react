import { type FC, Fragment } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import {
	PERSONAL_CHANGE_ACCOUNT_LIST,
	type TChangeAccountSchema
} from "../model";

interface IPersonalInfoProps {
	form: UseFormReturn<TChangeAccountSchema>;
}

export const PersonalInfo: FC<IPersonalInfoProps> = ({ form }) => {
	const { t } = useTranslation("account_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.personal.title")}</h2>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				{PERSONAL_CHANGE_ACCOUNT_LIST.map((item, index) => (
					<Fragment key={item?.key}>
						{index === 1 && <div />}
						<CustomField
							control={form?.control}
							name={item?.key}
							label={item?.label}
							placeholder={item?.placeholder}
							t={t}
						/>
					</Fragment>
				))}
			</div>
		</div>
	);
};
