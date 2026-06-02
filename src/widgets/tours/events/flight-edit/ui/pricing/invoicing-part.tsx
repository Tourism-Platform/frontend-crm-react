import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomField, withErrorBoundary } from "@/shared/ui";

import { ENUM_FLIGHT_PRICING_FIELD } from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	FLIGHT_PACKAGE_OPTIONS,
	type ISlotProps
} from "../../model";

// import { BookingDetails } from "./booking-details";

const InvoicingPartBase: FC<ISlotProps> = ({ form }) => {
	const { t } = useTranslation("flight_edit_page");

	return (
		<div className="grid gap-1">
			<h3 className="text-lg">{t("form.pricing.form.package.title")}</h3>
			<div className="grid grid-cols-3 mb-8">
				<CustomField
					control={form?.control}
					name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_FLIGHT_PRICING_FIELD.PACKAGE_TYPE}`}
					label="form.pricing.form.package.fields.package.label"
					fieldType="select"
					options={FLIGHT_PACKAGE_OPTIONS}
					defaultValue={FLIGHT_PACKAGE_OPTIONS[0]?.value}
					t={t}
				/>
			</div>
			{/* <Separator className="mb-12" />
			<BookingDetails form={form} /> */}
		</div>
	);
};

export const InvoicingPart = withErrorBoundary(InvoicingPartBase);
