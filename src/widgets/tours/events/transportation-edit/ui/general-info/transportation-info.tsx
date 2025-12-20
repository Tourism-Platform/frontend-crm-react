import { type FC, Fragment } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import { type TGeneralInfoSchema, TRANSPORTATION_DATA_LIST } from "../../model";

interface ITransportationInfoProps {
	form: UseFormReturn<TGeneralInfoSchema>;
}

export const TransportationInfo: FC<ITransportationInfoProps> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");

	return (
		<div className="grid gap-8">
			<h2 className="text-xl">{t("general.details.title")}</h2>

			<div className="grid grid-cols-4 gap-x-4 gap-y-1">
				{TRANSPORTATION_DATA_LIST.map(({ key, ...item }, index) => (
					<Fragment key={key}>
						<CustomField
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
						{index === 0 && <div className="col-span-2" />}
					</Fragment>
				))}
			</div>
		</div>
	);
};
