import { format } from "date-fns";
import { type FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/shared/ui";

import type { TSubmittedBooking } from "@/entities/booking";
import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";
import type { IPreviewTourGeneral } from "@/entities/tour/preview-tour";

interface ISidebarProps {
	tourData?: IPreviewTourGeneral;
	options: IPreviewOptionCard[];
	submittedBooking?: TSubmittedBooking | null;
}

const parsePrice = (price: string) =>
	parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;

export const PreviewBookingSidebar: FC<ISidebarProps> = ({
	tourData,
	options,
	submittedBooking
}) => {
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

	const selectedOption = options.find((opt) => opt.id === optionId);
	const pricePerPerson = selectedOption
		? parsePrice(selectedOption.price)
		: submittedBooking
			? parseFloat(submittedBooking.tourAmount) / submittedBooking.pax
			: 0;
	const travellersCount = submittedBooking?.pax ?? count ?? 1;
	const total = submittedBooking
		? parseFloat(submittedBooking.tourAmount)
		: pricePerPerson * travellersCount;

	const startDate = submittedBooking?.date
		? new Date(submittedBooking.date)
		: date;
	const endDate = submittedBooking?.endDate
		? new Date(submittedBooking.endDate)
		: startDate
			? new Date(startDate)
			: undefined;

	const durationDays =
		typeof tourData?.duration === "object"
			? (tourData.duration as { to?: number; from?: number }).to ||
				(tourData.duration as { to?: number; from?: number }).from ||
				1
			: Number(tourData?.duration || 1);

	if (endDate && startDate && !submittedBooking?.endDate) {
		endDate.setDate(startDate.getDate() + durationDays);
	}

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
							{startDate
								? format(startDate, "MMM dd, yyyy")
								: t("sidebar.not_selected")}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.end_date")}
						</span>
						<span className="font-medium text-right">
							{endDate
								? format(endDate, "MMM dd, yyyy")
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
							{travellersCount || t("sidebar.not_selected")}{" "}
							{travellersCount ? t("sidebar.person") : ""}
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
						{submittedBooking?.tourCurrency ?? "$"}
						{pricePerPerson.toFixed(2)}
					</span>
				</div>

				<div className="flex justify-between items-end">
					<span className="font-semibold">
						{t("sidebar.estimated_total")}
					</span>
					<div className="flex flex-col items-end">
						<span className="text-2xl font-bold">
							{submittedBooking?.tourCurrency ?? "$"}
							{total.toFixed(2)}
						</span>
						{travellersCount > 0 && pricePerPerson > 0 && (
							<span className="text-xs text-muted-foreground text-blue-400">
								{travellersCount} {t("sidebar.person")} X{" "}
								{submittedBooking?.tourCurrency ?? "$"}
								{pricePerPerson.toFixed(2)}
							</span>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
