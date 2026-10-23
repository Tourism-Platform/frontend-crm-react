import { format } from "date-fns";
import { type FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Card, CardContent, CustomField, LoaderButton } from "@/shared/ui";
import { formatMoney } from "@/shared/utils";

import type { IBookingPrice, TSubmittedBooking } from "@/entities/booking";
import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";
import type { IPreviewTourGeneral } from "@/entities/tour/preview-tour";

type TSidebarAction = {
	label: string;
	loadingLabel: string;
	isLoading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit";
	form?: string;
	onClick?: () => void;
};

interface ISidebarProps {
	tourData?: IPreviewTourGeneral;
	options: IPreviewOptionCard[];
	submittedBooking?: TSubmittedBooking | null;
	price?: IBookingPrice;
	isPriceFetching?: boolean;
	action?: TSidebarAction;
}

export const PreviewBookingSidebar: FC<ISidebarProps> = ({
	tourData,
	options,
	submittedBooking,
	price,
	isPriceFetching,
	action
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
	const travellersCount = submittedBooking?.pax ?? count ?? 1;
	const moneyOptions = { currency: price?.currency, compact: false };
	const perPersonLabel = price
		? formatMoney(price.totalMinPrice / price.pax, moneyOptions)
		: t("sidebar.not_selected");
	const totalLabel = price
		? t("sidebar.price_from", {
				price: formatMoney(price.totalMinPrice, moneyOptions)
			})
		: t("sidebar.not_selected");

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
		<Card className="sticky top-24 w-full shrink-0">
			<CardContent className="flex flex-col p-6">
				<h3 className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
					{t("sidebar.title")}
				</h3>
				<p className="mb-6 text-base font-semibold">
					{tourData?.tourTitle || "..."}
				</p>

				<div className="mb-6 flex flex-col gap-3 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.start_date")}
						</span>
						<span className="text-right font-medium">
							{startDate
								? format(startDate, "MMM dd, yyyy")
								: t("sidebar.not_selected")}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.end_date")}
						</span>
						<span className="text-right font-medium">
							{endDate
								? format(endDate, "MMM dd, yyyy")
								: t("sidebar.not_selected")}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.duration")}
						</span>
						<span className="text-right font-medium">
							{durationDays} {t("sidebar.days")}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.travellers")}
						</span>
						<span className="text-right font-medium">
							{travellersCount || t("sidebar.not_selected")}{" "}
							{travellersCount ? t("sidebar.person") : ""}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("sidebar.package")}
						</span>
						<span className="text-right font-medium">
							{selectedOption?.title || t("sidebar.not_selected")}
						</span>
					</div>
				</div>

				<div
					className={cn(
						"mb-4 flex flex-col gap-3 border-y py-4 transition-opacity",
						isPriceFetching && "opacity-50"
					)}
				>
					{!submittedBooking ? (
						<div className="flex items-center justify-between gap-4">
							<span className="text-sm text-muted-foreground">
								{t("sidebar.currency")}
							</span>
							<CustomField
								control={form.control}
								name={ENUM_FORM_PREVIEW_BOOKING.CURRENCY}
								fieldType="select"
								label="sidebar.currency"
								options={[...CURRENCY_OPTIONS]}
								t={t}
								hideLabel
								className="w-28"
							/>
						</div>
					) : null}
					<div className="flex justify-between">
						<span className="text-sm text-muted-foreground">
							{t("sidebar.price_per_person")}
						</span>
						<span className="font-semibold">{perPersonLabel}</span>
					</div>
				</div>

				<div className="mb-6 flex flex-col gap-2">
					<div className="flex items-center justify-between gap-4">
						<span className="font-semibold">
							{t("sidebar.estimated_total")}
						</span>
						<span
							className={cn(
								"text-right text-2xl font-bold transition-opacity",
								isPriceFetching && "opacity-50"
							)}
						>
							{totalLabel}
						</span>
					</div>
					<p className="text-xs text-muted-foreground">
						{t("sidebar.price_note")}
					</p>
				</div>

				{action ? (
					<LoaderButton
						type={action.type ?? "button"}
						form={action.form}
						className="w-full"
						disabled={action.disabled}
						isLoading={action.isLoading}
						onClick={action.onClick}
						label={action.label}
						loadingLabel={action.loadingLabel}
					/>
				) : null}
			</CardContent>
		</Card>
	);
};
