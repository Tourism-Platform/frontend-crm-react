import { isBefore, startOfToday } from "date-fns";
import { Loader2, Minus, Plus } from "lucide-react";
import { type FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { TPreviewBookingPageKeys } from "@/shared/config";
import {
	Button,
	Calendar,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/shared/ui";

import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";

import { PreviewBookingOptionCard } from "../preview-booking-option-card";

interface IStep1Props {
	onNext: () => void;
	onMonthChange: (month: Date) => void;
	isLoading: boolean;
	options: IPreviewOptionCard[];
	availableDates: Date[];
	isOptionsLoading: boolean;
	isOptionLocked?: boolean;
}

export const Step1DateTravellers: FC<IStep1Props> = ({
	onNext,
	onMonthChange,
	isLoading,
	options,
	availableDates,
	isOptionsLoading,
	isOptionLocked = false
}) => {
	const { t } = useTranslation("preview_booking_page");
	const form = useFormContext<TPreviewBookingSchema>();
	const count = form.watch(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT);
	const selectedOptionId = form.watch(ENUM_FORM_PREVIEW_BOOKING.OPTION_ID);
	const selectedDate = form.watch(ENUM_FORM_PREVIEW_BOOKING.DATE);

	useEffect(() => {
		const currentArr =
			form.getValues(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS) || [];
		if (currentArr.length < count) {
			const toAdd = count - currentArr.length;
			const newArr = [...currentArr, ...Array(toAdd).fill({})];
			form.setValue(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS, newArr);
		} else if (currentArr.length > count) {
			form.setValue(
				ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS,
				currentArr.slice(0, count)
			);
		}
	}, [count, form]);

	return (
		<div className="flex flex-col gap-6 w-full">
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">
						{t("step_1.start_date.title")}
					</CardTitle>
					<CardDescription>
						{t("step_1.start_date.description")}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex justify-center border-t pt-4">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={(date) => {
								if (date) {
									form.setValue(
										ENUM_FORM_PREVIEW_BOOKING.DATE,
										date,
										{ shouldValidate: true }
									);
								}
							}}
							disabled={(date) =>
								isBefore(date, startOfToday()) ||
								!availableDates.some(
									(d) =>
										d.getFullYear() ===
											date.getFullYear() &&
										d.getMonth() === date.getMonth() &&
										d.getDate() === date.getDate()
								)
							}
							showOutsideDays={false}
							numberOfMonths={2}
							pagedNavigation
							onMonthChange={onMonthChange}
							classNames={{
								months: "sm:flex-col md:flex-row gap-20",
								month: "relative first-of-type:before:hidden before:absolute max-md:before:inset-x-2 max-md:before:h-px max-md:before:-top-4 md:before:inset-y-2 md:before:w-px md:before:-left-4"
							}}
						/>
					</div>
					{form.formState.errors[ENUM_FORM_PREVIEW_BOOKING.DATE] && (
						<p className="text-sm text-destructive text-center">
							{t(
								form.formState.errors[
									ENUM_FORM_PREVIEW_BOOKING.DATE
								]?.message as TPreviewBookingPageKeys
							)}
						</p>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">
						{t("step_1.travellers.title")}
					</CardTitle>
					<CardDescription>
						{t("step_1.travellers.description")}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex items-center justify-between border-t pt-4">
						<div>
							<p className="font-medium">
								{t("step_1.travellers.title")}
							</p>
							<p className="text-xs text-muted-foreground">
								{t("step_1.travellers.max_limit")}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<Button
								type="button"
								variant="outline"
								size="icon"
								className="size-8 rounded-full"
								disabled={count <= 1}
								onClick={() =>
									form.setValue(
										ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT,
										count - 1,
										{ shouldValidate: true }
									)
								}
							>
								<Minus className="size-4" />
							</Button>
							<span className="w-4 text-center font-medium">
								{count}
							</span>
							<Button
								type="button"
								variant="outline"
								size="icon"
								className="size-8 rounded-full"
								disabled={count >= 20}
								onClick={() =>
									form.setValue(
										ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT,
										count + 1,
										{ shouldValidate: true }
									)
								}
							>
								<Plus className="size-4" />
							</Button>
						</div>
					</div>
					{form.formState.errors[
						ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
					] && (
						<p className="text-sm text-destructive">
							{t(
								form.formState.errors[
									ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
								]?.message as TPreviewBookingPageKeys
							)}
						</p>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">
						{t("step_1.options.title")}
					</CardTitle>
					<CardDescription>
						{isOptionLocked
							? t("step_1.options.locked")
							: t("step_1.options.description")}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					{isOptionsLoading ? (
						<div className="flex justify-center py-8">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<div className="flex flex-col gap-4">
							{options.map((opt) => (
								<PreviewBookingOptionCard
									key={opt.id}
									option={opt}
									isSelected={selectedOptionId === opt.id}
									disabled={isOptionLocked}
									onSelect={(optionId) =>
										form.setValue(
											ENUM_FORM_PREVIEW_BOOKING.OPTION_ID,
											optionId,
											{ shouldValidate: true }
										)
									}
								/>
							))}
						</div>
					)}

					{form.formState.errors[
						ENUM_FORM_PREVIEW_BOOKING.OPTION_ID
					] && (
						<p className="text-sm text-destructive">
							{t(
								form.formState.errors[
									ENUM_FORM_PREVIEW_BOOKING.OPTION_ID
								]?.message as TPreviewBookingPageKeys
							)}
						</p>
					)}
				</CardContent>
			</Card>

			<div className="flex justify-end">
				<Button
					type="button"
					onClick={onNext}
					disabled={isLoading}
					className="min-w-32"
				>
					{isLoading && (
						<Loader2 className="size-4 mr-2 animate-spin" />
					)}
					{t("step_1.continue")}
				</Button>
			</div>
		</div>
	);
};
