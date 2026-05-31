import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField, withErrorBoundary } from "@/shared/ui";

import type { TAccommodationEditSchema } from "@/entities/tour";

import { ACCOMMODATION_DETAILS_LIST, ENUM_FORM_SECTION } from "../../model";

interface IAccommodationDetailsProps {
	form: UseFormReturn<TAccommodationEditSchema>;
}

const AccommodationDetailsBase: FC<IAccommodationDetailsProps> = ({ form }) => {
	const { t } = useTranslation("accommodation_edit_page");
	return (
		<div className="grid gap-5">
			<h2 className="text-xl">{t("form.general.details.title")}</h2>
			<div className="grid grid-cols-2 gap-y-1">
				{ACCOMMODATION_DETAILS_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
						t={t}
						{...item}
					/>
				))}
			</div>
		</div>
	);
};

export const AccommodationDetails = withErrorBoundary(AccommodationDetailsBase);
