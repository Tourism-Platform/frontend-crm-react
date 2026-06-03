import { format } from "date-fns";
import { Check, Clock, Copy, DollarSign, Star, ThumbsUp } from "lucide-react";
import { type FC, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { ENUM_PATH } from "@/shared/config/routes/routes.config";
import { Button } from "@/shared/ui";

import type { TSubmittedBooking } from "@/entities/booking";
import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";
import type { ITourGeneral } from "@/entities/tour/tour";

interface IStep3Props {
	submittedBooking?: TSubmittedBooking | null;
	tourData?: ITourGeneral;
	options: IPreviewOptionCard[];
}

const TIMELINE_KEYS = [
	"request_submitted",
	"provider_review",
	"booking_confirmed",
	"payment_info",
	"voucher_time"
] as const;

const TIMELINE_ICONS = [Check, Clock, ThumbsUp, DollarSign, Star];

export const Step3Confirmation: FC<IStep3Props> = ({
	submittedBooking,
	tourData,
	options
}) => {
	const { t } = useTranslation("preview_booking_page");
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);
	const form = useFormContext<TPreviewBookingSchema>();

	const optionId = useWatch({
		control: form.control,
		name: ENUM_FORM_PREVIEW_BOOKING.OPTION_ID
	});
	const count = useWatch({
		control: form.control,
		name: ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
	});
	const date = useWatch({
		control: form.control,
		name: ENUM_FORM_PREVIEW_BOOKING.DATE
	});

	const bookingId = submittedBooking?.id ?? "";
	const selectedOption = options.find((opt) => opt.id === optionId);
	const total = submittedBooking
		? parseFloat(submittedBooking.tourAmount)
		: 0;

	const handleCopy = async () => {
		if (!bookingId) return;

		try {
			await navigator.clipboard.writeText(bookingId);
			setCopied(true);
			toast.success(t("step_3.copied"));
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error(t("step_3.copy_failed"));
		}
	};

	return (
		<div className="flex flex-col items-center gap-8 w-full py-4">
			<div className="w-full max-w-2xl bg-white border rounded-2xl p-8 flex flex-col items-center gap-6">
				<div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
					<Check className="w-8 h-8 text-green-500" />
				</div>

				<div className="text-center flex flex-col gap-2">
					<h2 className="text-2xl font-bold">
						{t("step_3.success_title")}
					</h2>
					<p className="text-muted-foreground text-sm max-w-md mx-auto">
						{t("step_3.success_desc")}
					</p>
				</div>

				<div className="bg-slate-50 border rounded-full px-6 py-3 flex items-center gap-3">
					<span className="text-sm font-medium text-muted-foreground">
						{t("step_3.booking_id")}
					</span>
					<span className="font-bold">{bookingId}</span>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-6 w-6"
						onClick={handleCopy}
					>
						{copied ? (
							<Check className="w-3 h-3 text-green-500" />
						) : (
							<Copy className="w-3 h-3 text-muted-foreground" />
						)}
					</Button>
				</div>

				<div className="w-full flex flex-col gap-6 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-px before:bg-border">
					{TIMELINE_KEYS.map((key, index) => {
						const Icon = TIMELINE_ICONS[index];
						const isActive = index === 0;
						const isPending = index === 1;

						return (
							<div key={key} className="flex gap-4 relative z-10">
								<div
									className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-white border ${
										isActive
											? "border-green-500 text-green-500"
											: isPending
												? "border-blue-400 text-blue-400"
												: "border-border text-muted-foreground"
									}`}
								>
									<Icon className="w-3.5 h-3.5" />
								</div>
								<div className="flex flex-col gap-1 pt-0.5">
									<p className="text-sm font-semibold">
										{t(`step_3.timeline.${key}.title`)}
									</p>
									<p className="text-xs text-muted-foreground">
										{t(`step_3.timeline.${key}.desc`)}
									</p>
								</div>
							</div>
						);
					})}
				</div>

				<div className="w-full bg-slate-50 rounded-xl p-6 flex flex-col gap-3">
					<h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
						{t("step_3.summary.title")}
					</h4>
					<div className="grid gap-2 text-sm">
						<div className="flex justify-between gap-4">
							<span className="text-muted-foreground">
								{t("step_3.summary.tour")}
							</span>
							<span className="font-medium text-right">
								{tourData?.tourTitle}
							</span>
						</div>
						<div className="flex justify-between gap-4">
							<span className="text-muted-foreground">
								{t("step_3.summary.start_date")}
							</span>
							<span className="font-medium">
								{submittedBooking?.date
									? format(
											new Date(submittedBooking.date),
											"MMM dd, yyyy"
										)
									: date
										? format(date, "MMM dd, yyyy")
										: "-"}
							</span>
						</div>
						<div className="flex justify-between gap-4">
							<span className="text-muted-foreground">
								{t("step_3.summary.end_date")}
							</span>
							<span className="font-medium">
								{submittedBooking?.endDate
									? format(
											new Date(submittedBooking.endDate),
											"MMM dd, yyyy"
										)
									: "-"}
							</span>
						</div>
						<div className="flex justify-between gap-4">
							<span className="text-muted-foreground">
								{t("step_3.summary.travellers")}
							</span>
							<span className="font-medium">
								{submittedBooking?.pax ?? count}
							</span>
						</div>
						<div className="flex justify-between gap-4">
							<span className="text-muted-foreground">
								{t("step_3.summary.package")}
							</span>
							<span className="font-medium">
								{selectedOption?.title ?? "-"}
							</span>
						</div>
					</div>
					<div className="flex justify-between items-end border-t pt-4 mt-2">
						<span className="font-semibold">
							{t("step_3.summary.estimated_total")}
						</span>
						<span className="text-2xl font-bold">
							{submittedBooking?.tourCurrency ?? "$"}
							{total.toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			<div className="flex justify-center gap-4">
				<Button
					type="button"
					className="bg-blue-400 hover:bg-blue-500 text-white"
					onClick={() => navigate(ENUM_PATH.BOOKING.ORDERS)}
				>
					{t("step_3.view_my_bookings")}
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => navigate(ENUM_PATH.TOURS.CATALOG.ROOT)}
				>
					{t("step_3.catalogue")}
				</Button>
			</div>
		</div>
	);
};
