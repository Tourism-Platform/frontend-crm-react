import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { PACKAGE_TYPE_OPTIONS } from "@/shared/config";
import { CustomField, Separator, withErrorBoundary } from "@/shared/ui";

import type { TPricingSchema } from "../model";

import { BookingDetails } from "./booking-details";

export interface IInvoicingPartProps {
	form: UseFormReturn<TPricingSchema>;
}

const InvoicingPartBase: FC<IInvoicingPartProps> = ({ form }) => {
	const { t } = useTranslation("flight_edit_page");
	return (
		<div className="grid">
			<div className="grid grid-cols-3 mb-8">
				<CustomField
					control={form?.control}
					name="package"
					label="pricing.form.package.fields.package.label"
					fieldType="select"
					options={PACKAGE_TYPE_OPTIONS}
					defaultValue={PACKAGE_TYPE_OPTIONS?.[0]?.value}
					t={t}
				/>
			</div>
			<Separator className="mb-12" />
			<BookingDetails form={form} />
		</div>
	);
};

export const InvoicingPart = withErrorBoundary(InvoicingPartBase);
