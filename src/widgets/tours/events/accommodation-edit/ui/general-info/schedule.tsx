import { type FC, Fragment } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { SCHEDULE_LIST, type TGeneralInfoSchema } from "../../model";

interface IScheduleProps {
	form: UseFormReturn<TGeneralInfoSchema>;
}

export const Schedule: FC<IScheduleProps> = ({ form }) => {
	const { t } = useTranslation("accommodation_edit_page");
	return (
		<div className="grid gap-5">
			<h2 className="text-xl">{t("general.schedule.title")}</h2>
			<div className="grid grid-cols-4 gap-x-4 gap-y-1">
				{SCHEDULE_LIST.map(({ key, ...item }, index) => (
					<Fragment key={key}>
						<CustomField
							control={form?.control}
							name={key}
							t={t}
							className={
								index === 0 ? "col-span-2" : "col-span-1"
							}
							{...item}
						/>
						{index === 0 && <div className="col-span-2" />}
					</Fragment>
				))}
			</div>
		</div>
	);
};
