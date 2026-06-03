import { Loader2, Minus, Plus } from "lucide-react";
import { type FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Calendar } from "@/shared/ui";

import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";

import { PreviewBookingOptionCard } from "../preview-booking-option-card";

interface IStep1Props {
	onNext: () => void;
	isLoading: boolean;
	options: IPreviewOptionCard[];
	isOptionsLoading: boolean;
	isOptionLocked?: boolean;
}

export const Step1DateTravellers: FC<IStep1Props> = ({
	onNext,
	isLoading,
	options,
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
			<div className="bg-white rounded-xl border p-6 flex flex-col gap-4">
				<div>
					<h3 className="text-lg font-semibold">
						{t("step_1.start_date.title")}
					</h3>
					<p className="text-sm text-muted-foreground">
						{t("step_1.start_date.description")}
					</p>
				</div>
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
						numberOfMonths={1}
						pagedNavigation
						classNames={{
							months: "sm:flex-col md:flex-row gap-20",
							month: "relative first-of-type:before:hidden before:absolute max-md:before:inset-x-2 max-md:before:h-px max-md:before:-top-4 md:before:inset-y-2 md:before:w-px md:before:-left-4"
						}}
					/>
				</div>
				{form.formState.errors[ENUM_FORM_PREVIEW_BOOKING.DATE] && (
					<p className="text-sm text-destructive text-center">
						{
							form.formState.errors[
								ENUM_FORM_PREVIEW_BOOKING.DATE
							]?.message
						}
					</p>
				)}
			</div>

			<div className="bg-white rounded-xl border p-6 flex flex-col gap-4">
				<div>
					<h3 className="text-lg font-semibold">
						{t("step_1.travellers.title")}
					</h3>
					<p className="text-sm text-muted-foreground">
						{t("step_1.travellers.description")}
					</p>
				</div>
				<div className="flex items-center justify-between mt-2 border-t pt-4">
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
							className="h-8 w-8 rounded-full"
							disabled={count <= 1}
							onClick={() =>
								form.setValue(
									ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT,
									count - 1,
									{ shouldValidate: true }
								)
							}
						>
							<Minus className="h-4 w-4" />
						</Button>
						<span className="w-4 text-center font-medium">
							{count}
						</span>
						<Button
							type="button"
							variant="outline"
							size="icon"
							className="h-8 w-8 rounded-full"
							disabled={count >= 20}
							onClick={() =>
								form.setValue(
									ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT,
									count + 1,
									{ shouldValidate: true }
								)
							}
						>
							<Plus className="h-4 w-4" />
						</Button>
					</div>
				</div>
				{form.formState.errors[
					ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
				] && (
					<p className="text-sm text-destructive">
						{
							form.formState.errors[
								ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
							]?.message
						}
					</p>
				)}
			</div>

			<div className="bg-white rounded-xl border p-6 flex flex-col gap-4">
				<div>
					<h3 className="text-lg font-semibold">
						{t("step_1.options.title")}
					</h3>
					<p className="text-sm text-muted-foreground">
						{isOptionLocked
							? t("step_1.options.locked")
							: t("step_1.options.description")}
					</p>
				</div>

				{isOptionsLoading ? (
					<div className="flex justify-center py-8">
						<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
					</div>
				) : (
					<div className="flex flex-col gap-4 mt-2">
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

				{form.formState.errors[ENUM_FORM_PREVIEW_BOOKING.OPTION_ID] && (
					<p className="text-sm text-destructive mt-2">
						{
							form.formState.errors[
								ENUM_FORM_PREVIEW_BOOKING.OPTION_ID
							]?.message
						}
					</p>
				)}
			</div>

			<div className="flex justify-end mt-4">
				<Button
					type="button"
					onClick={onNext}
					disabled={isLoading}
					className="w-auto min-w-32 bg-blue-400 hover:bg-blue-500 text-white"
				>
					{isLoading && (
						<Loader2 className="w-4 h-4 mr-2 animate-spin" />
					)}
					{t("step_1.continue")}
				</Button>
			</div>
		</div>
	);
};
