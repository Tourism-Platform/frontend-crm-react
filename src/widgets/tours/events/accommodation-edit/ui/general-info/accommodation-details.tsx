import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField } from "@/shared/ui";

import {
	ACCOMMODATION_DETAILS_LIST,
	type TGeneralInfoSchema
} from "../../model";

interface IAccommodationDetailsProps {
	form: UseFormReturn<TGeneralInfoSchema>;
}

export const AccommodationDetails: FC<IAccommodationDetailsProps> = ({
	form
}) => {
	const { t } = useTranslation("accommodation_edit_page");
	return (
		<div className="grid gap-5">
			<h2 className="text-xl">{t("general.accommodation.title")}</h2>
			<div className="grid grid-cols-2 gap-y-1">
				{ACCOMMODATION_DETAILS_LIST.map(({ key, ...item }) => (
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
