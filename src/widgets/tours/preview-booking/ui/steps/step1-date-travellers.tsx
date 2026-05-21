import { Minus, Plus } from "lucide-react";
import { type FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import { PREVIEW_TOUR_OPTIONS_MOCK } from "@/entities/tour/preview-tour/mock";

interface IStep1Props {
	onNext: () => void;
}

export const Step1DateTravellers: FC<IStep1Props> = ({ onNext }) => {
	const { t } = useTranslation("preview_booking_page");
	const form = useFormContext<TPreviewBookingSchema>();
	const count = form.watch(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT);

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
					<CustomField
						name={ENUM_FORM_PREVIEW_BOOKING.DATE}
						control={form.control}
						label=""
						fieldType="date"
						t={t}
					/>
				</div>
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
						{t("step_1.options.description")}
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
					{PREVIEW_TOUR_OPTIONS_MOCK.map((opt) => {
						const isSelected =
							form.watch(ENUM_FORM_PREVIEW_BOOKING.OPTION_ID) ===
							opt.id;
						return (
							<div
								key={opt.id}
								onClick={() =>
									form.setValue(
										ENUM_FORM_PREVIEW_BOOKING.OPTION_ID,
										opt.id,
										{ shouldValidate: true }
									)
								}
								className={`cursor-pointer rounded-xl border p-4 flex flex-col gap-2 transition-colors ${
									isSelected
										? "bg-blue-50 border-blue-200"
										: "hover:bg-slate-50"
								}`}
							>
								<div className="flex justify-between items-start">
									<p className="font-semibold text-base">
										{opt.title}
									</p>
									<div
										className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-input"}`}
									>
										{isSelected && (
											<span className="w-2 h-2 rounded-full bg-white" />
										)}
									</div>
								</div>
								<p className="text-xs text-muted-foreground line-clamp-2">
									{opt.description}
								</p>
								<p className="text-lg font-bold mt-2">
									{opt.price}{" "}
									<span className="text-xs font-normal text-muted-foreground">
										{t("step_1.options.per_person")}
									</span>
								</p>
							</div>
						);
					})}
				</div>
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
					className="w-32 bg-blue-400 hover:bg-blue-500 text-white"
				>
					{t("step_1.continue")}
				</Button>
			</div>
		</div>
	);
};
