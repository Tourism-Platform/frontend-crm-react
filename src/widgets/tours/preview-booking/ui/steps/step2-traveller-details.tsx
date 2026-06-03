import { Loader2, Plus, Trash2 } from "lucide-react";
import { type FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Gender } from "@/shared/api";
import { Button, CustomField } from "@/shared/ui";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/shared/ui/shadcn-ui/accordion";

import {
	ENUM_FORM_PREVIEW_BOOKING,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";

interface IStep2Props {
	onPrev: () => void;
	onAddTraveller: () => void;
	onRemoveTraveller: (index: number) => void;
	canAddTraveller: boolean;
	isLoading: boolean;
	isPaxLoading: boolean;
}

const GENDER_OPTIONS = [
	{ value: Gender.M, labelKey: "step_2.fields.gender.options.male" },
	{ value: Gender.F, labelKey: "step_2.fields.gender.options.female" }
] as const;

export const Step2TravellerDetails: FC<IStep2Props> = ({
	onPrev,
	onAddTraveller,
	onRemoveTraveller,
	canAddTraveller,
	isLoading,
	isPaxLoading
}) => {
	const { t } = useTranslation("preview_booking_page");
	const form = useFormContext<TPreviewBookingSchema>();
	const { fields } = useFieldArray({
		control: form.control,
		name: ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS
	});

	if (isPaxLoading) {
		return (
			<div className="flex justify-center py-16">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 w-full">
			<div className="bg-white rounded-xl border p-6 flex flex-col gap-4">
				<div>
					<h3 className="text-lg font-semibold">
						{t("step_2.title")}
					</h3>
					<p className="text-sm text-muted-foreground">
						{t("step_2.description")}
					</p>
				</div>

				<Accordion
					type="multiple"
					defaultValue={fields.map((field) => field.id)}
					className="w-full flex flex-col gap-4 mt-4"
				>
					{fields.map((field, index) => {
						const prefix = `${ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS}.${index}.`;
						const isLead = index === 0;

						return (
							<AccordionItem
								key={field.id}
								value={field.id}
								className="border rounded-xl px-4 py-2"
							>
								<div className="flex w-full items-center gap-2">
									<AccordionTrigger className="flex-1 hover:no-underline py-2">
										<div className="flex flex-col items-start gap-1">
											<div className="flex items-center gap-2">
												<span className="font-semibold text-base">
													{t("step_2.traveller")}{" "}
													{index + 1}
												</span>
												{isLead && (
													<>
														<span className="w-1 h-1 rounded-full bg-primary" />
														<span className="text-sm text-primary font-medium">
															{t("step_2.lead")}
														</span>
													</>
												)}
											</div>
											<span className="text-xs text-muted-foreground">
												{t("step_2.optional_hint")}
											</span>
										</div>
									</AccordionTrigger>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="shrink-0 text-muted-foreground hover:text-destructive"
										disabled={isLoading}
										onClick={() => onRemoveTraveller(index)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
								<AccordionContent className="pt-4 pb-4">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<CustomField
											name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.FIRST_NAME}`}
											control={form.control}
											label={t(
												"step_2.fields.first_name.label"
											)}
											fieldType="input"
											t={t}
										/>
										<CustomField
											name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.LAST_NAME}`}
											control={form.control}
											label={t(
												"step_2.fields.last_name.label"
											)}
											fieldType="input"
											t={t}
										/>
										<CustomField
											name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.GENDER}`}
											control={form.control}
											label={t(
												"step_2.fields.gender.label"
											)}
											fieldType="select"
											options={GENDER_OPTIONS.map(
												(option) => ({
													value: option.value,
													label: t(option.labelKey)
												})
											)}
											t={t}
										/>
										<CustomField
											name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.DATE_OF_BIRTH}`}
											control={form.control}
											label={t(
												"step_2.fields.date_of_birth.label"
											)}
											fieldType="date"
											t={t}
										/>
										<CustomField
											name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.NATIONALITY}`}
											control={form.control}
											label={t(
												"step_2.fields.nationality.label"
											)}
											fieldType="input"
											t={t}
										/>
										<CustomField
											name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.PASSPORT_NUMBER}`}
											control={form.control}
											label={t(
												"step_2.fields.passport_number.label"
											)}
											fieldType="input"
											t={t}
										/>
										<CustomField
											name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.PASSPORT_EXPIRY}`}
											control={form.control}
											label={t(
												"step_2.fields.passport_expiry.label"
											)}
											fieldType="date"
											t={t}
										/>
										<div className="sm:col-span-2">
											<CustomField
												name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.FILE}`}
												control={form.control}
												label={t(
													"step_2.fields.file.label"
												)}
												fieldType="upload"
												maxFiles={1}
												showAllRemoveButton={false}
												showTopTitle={false}
												t={t}
											/>
										</div>
										<div className="sm:col-span-2">
											<CustomField
												name={`${prefix}${ENUM_FORM_PREVIEW_BOOKING.NOTE}`}
												control={form.control}
												label={t(
													"step_2.fields.note.label"
												)}
												fieldType="textarea"
												placeholder={t(
													"step_2.fields.note.label"
												)}
												t={t}
											/>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>

				{canAddTraveller && (
					<Button
						type="button"
						variant="outline"
						className="w-fit"
						disabled={isLoading}
						onClick={onAddTraveller}
					>
						<Plus className="h-4 w-4 mr-2" />
						{t("step_2.add_traveller")}
					</Button>
				)}
			</div>

			<div className="flex justify-between mt-4">
				<Button
					type="button"
					variant="outline"
					onClick={onPrev}
					className="w-32"
				>
					{t("step_2.back")}
				</Button>
				<Button
					type="submit"
					disabled={isLoading}
					className="w-auto bg-blue-400 hover:bg-blue-500 text-white"
				>
					{isLoading && (
						<Loader2 className="w-4 h-4 mr-2 animate-spin" />
					)}
					{t("step_2.submit")}
				</Button>
			</div>
		</div>
	);
};
