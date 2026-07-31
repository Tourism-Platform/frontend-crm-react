import { format } from "date-fns";
import { Check, Clock, Copy, DollarSign, Star, ThumbsUp } from "lucide-react";
import { type FC, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { ENUM_PATH } from "@/shared/config/routes/routes.config";
import { cn } from "@/shared/lib";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/shared/ui";

import type { TSubmittedBooking } from "@/entities/booking";
import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import type {
	IPreviewOptionCard,
	IPreviewTourGeneral
} from "@/entities/tour/preview-tour";

interface IStep3Props {
	submittedBooking?: TSubmittedBooking | null;
	tourData?: IPreviewTourGeneral;
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
		<div className="flex w-full flex-col items-center gap-8 py-4">
			<Card className="w-full max-w-2xl">
				<CardHeader className="items-center text-center">
					<div className="mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10">
						<Check className="size-8 text-primary" />
					</div>
					<CardTitle className="text-2xl font-bold">
						{t("step_3.success_title")}
					</CardTitle>
					<CardDescription className="max-w-md">
						{t("step_3.success_desc")}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center gap-6">
					<div className="flex items-center gap-3 rounded-full border bg-muted px-6 py-3">
						<span className="text-sm font-medium text-muted-foreground">
							{t("step_3.booking_id")}
						</span>
						<span className="font-bold">{bookingId}</span>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="size-6"
							onClick={handleCopy}
						>
							{copied ? (
								<Check className="size-3 text-primary" />
							) : (
								<Copy className="size-3 text-muted-foreground" />
							)}
						</Button>
					</div>

					<div className="relative flex w-full flex-col gap-6 before:absolute before:top-4 before:bottom-4 before:left-3.5 before:w-px before:bg-border">
						{TIMELINE_KEYS.map((key, index) => {
							const Icon = TIMELINE_ICONS[index];
							const isActive = index === 0;
							const isPending = index === 1;

							return (
								<div
									key={key}
									className="relative z-10 flex gap-4"
								>
									<div
										className={cn(
											"flex size-7 shrink-0 items-center justify-center rounded-full border bg-card",
											isActive &&
												"border-primary text-primary",
											isPending &&
												"border-primary/50 text-primary/70",
											!isActive &&
												!isPending &&
												"border-border text-muted-foreground"
										)}
									>
										<Icon className="size-3.5" />
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

					<div className="flex w-full flex-col gap-3 rounded-xl bg-muted p-6">
						<h4 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
							{t("step_3.summary.title")}
						</h4>
						<div className="grid gap-2 text-sm">
							<div className="flex justify-between gap-4">
								<span className="text-muted-foreground">
									{t("step_3.summary.tour")}
								</span>
								<span className="text-right font-medium">
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
												new Date(
													submittedBooking.endDate
												),
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
						<div className="mt-2 flex items-end justify-between border-t pt-4">
							<span className="font-semibold">
								{t("step_3.summary.estimated_total")}
							</span>
							<span className="text-2xl font-bold">
								{submittedBooking?.tourCurrency ?? "$"}
								{total.toFixed(2)}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-center gap-4">
				<Button
					type="button"
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
