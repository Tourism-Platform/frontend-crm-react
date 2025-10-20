import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Button, CustomField } from "@/shared/ui";

import type { TPricingSchema } from "../model";

interface IBookingDetailsProps {
	form: UseFormReturn<TPricingSchema>;
	className?: string;
}

export const BookingDetails: FC<IBookingDetailsProps> = ({
	form,
	className
}) => {
	const { t } = useTranslation("flight_edit_page");
	return (
		<div className={cn("grid gap-1 mb-12", className)}>
			<h3 className="text-lg">
				{t("pricing.form.booking_details.title")}
			</h3>
			<div>
				<CustomField
					control={form?.control}
					name={"search"}
					t={t}
					label={t(
						"pricing.form.booking_details.fields.supplier.label"
					)}
					placeholder={t(
						"pricing.form.booking_details.fields.supplier.placeholder"
					)}
				/>
			</div>
			<div className="flex items-center justify-between">
				<div className="grid text-sm">
					<p>
						{t(
							"pricing.form.booking_details.fields.client_selection.label"
						)}
					</p>
					<span className="text-muted-foreground">
						{t(
							"pricing.form.booking_details.fields.client_selection.description"
						)}
					</span>
				</div>
				<Button variant={"outline"}>
					{t("pricing.form.booking_details.buttons.make_optional")}
				</Button>
			</div>
		</div>
	);
};
