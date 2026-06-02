import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomField, withErrorBoundary } from "@/shared/ui";

import { ENUM_ACCOMMODATION_PRICING_FIELD } from "@/entities/tour";

import {
	ACCOMMODATION_PACKAGE_OPTIONS,
	ENUM_FORM_SECTION,
	type ISlotProps
} from "../../model";

const InvoicingPartBase: FC<ISlotProps> = ({ form }) => {
	const { t } = useTranslation("accommodation_edit_page");

	return (
		<div className="grid gap-1">
			<h3 className="text-lg">{t("form.pricing.form.package.title")}</h3>
			<div className="grid grid-cols-3 mb-8">
				<CustomField
					control={form.control}
					name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_TYPE}`}
					label="form.pricing.form.package.fields.package.label"
					fieldType="select"
					options={ACCOMMODATION_PACKAGE_OPTIONS}
					t={t}
				/>
			</div>
		</div>
	);
};

export const InvoicingPart = withErrorBoundary(InvoicingPartBase);
