import { format } from "date-fns";
import { type FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/shared/ui";

import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import { PREVIEW_TOUR_OPTIONS_MOCK } from "@/entities/tour/preview-tour/mock";
import type { ITourGeneral } from "@/entities/tour/tour";

interface ISidebarProps {
	tourData?: ITourGeneral;
}

export const PreviewBookingSidebar: FC<ISidebarProps> = ({ tourData }) => {
	const { t } = useTranslation("preview_booking_page");
	const form = useFormContext<TPreviewBookingSchema>();

	const date = useWatch({
		control: form.control,
		name: ENUM_FORM_PREVIEW_BOOKING.DATE
	});
	const count = useWatch({
		control: form.control,
		name: ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
	});
	const optionId = useWatch({
		control: form.control,
		name: ENUM_FORM_PREVIEW_BOOKING.OPTION_ID
	});

	const selectedOption = PREVIEW_TOUR_OPTIONS_MOCK.find(
		(opt) => opt.id === optionId
	);
	const pricePerPerson = selectedOption
		? parseFloat(selectedOption.price.replace(/[^0-9.-]+/g, ""))
		: 0;
	const total = pricePerPerson * (count || 1);

	const durationDays =
		typeof tourData?.duration === "object"
			? (tourData.duration as any).to ||
				(tourData.duration as any).from ||
				1
			: Number(tourData?.duration || 1);

	return (
		<Card className="w-full shrink-0 sticky top-8">
			<CardContent className="flex flex-col p-6">
				<h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
					{t("sidebar.title")}
				</h3>
				<p className="font-semibold text-base mb-6">
					{tourData?.tourTitle || "..."}
				</p>

				<div className="flex flex-col gap-3 text-sm mb-6">
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.start_date")}
						</span>
						<span className="font-medium text-right">
							{date
								? format(date, "MMM dd, yyyy")
								: t("sidebar.not_selected")}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.end_date")}
						</span>
						<span className="font-medium text-right">
							{date && durationDays
								? format(
										new Date(date).setDate(
											new Date(date).getDate() +
												durationDays
										),
										"MMM dd, yyyy"
									)
								: t("sidebar.not_selected")}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.duration")}
						</span>
						<span className="font-medium text-right">
							{durationDays} {t("sidebar.days")}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.travellers")}
						</span>
						<span className="font-medium text-right">
							{count || t("sidebar.not_selected")}{" "}
							{count ? t("sidebar.person") : ""}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.package")}
						</span>
						<span className="font-medium text-right">
							{selectedOption?.title || t("sidebar.not_selected")}
						</span>
					</div>
				</div>

				<div className="flex justify-between border-y py-4 mb-4">
					<span className="text-sm text-muted-foreground">
						{t("sidebar.price_per_person")}
					</span>
					<span className="font-semibold">
						${pricePerPerson.toFixed(2)}
					</span>
				</div>

				<div className="flex justify-between items-end">
					<span className="font-semibold">
						{t("sidebar.estimated_total")}
					</span>
					<div className="flex flex-col items-end">
						<span className="text-2xl font-bold">
							${total.toFixed(2)}
						</span>
						{count > 0 && pricePerPerson > 0 && (
							<span className="text-xs text-muted-foreground text-blue-400">
								{count} {t("sidebar.person")} X $
								{pricePerPerson.toFixed(2)}
							</span>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
