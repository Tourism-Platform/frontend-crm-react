import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomField, withErrorBoundary } from "@/shared/ui";

import { ENUM_TRANSPORTATION_PRICING_FIELD } from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	type ISlotProps,
	TRANSPORTATION_PACKAGE_OPTIONS
} from "../../model";

const InvoicingPartBase: FC<ISlotProps> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");

	return (
		<div className="grid gap-1">
			<h3 className="text-lg">{t("form.pricing.form.package.title")}</h3>
			<div className="grid grid-cols-3 mb-8">
				<CustomField
					control={form.control}
					name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PACKAGE_TYPE}`}
					label="form.pricing.form.package.fields.package.label"
					fieldType="select"
					options={TRANSPORTATION_PACKAGE_OPTIONS}
					t={t}
				/>
			</div>
		</div>
	);
};

export const InvoicingPart = withErrorBoundary(InvoicingPartBase);
