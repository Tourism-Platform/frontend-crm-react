import { AddIcon } from "@solar-icons/react/bold/add";
import {
	CheckCircleIcon,
	DisketteIcon,
	TrashBinTrashIcon
} from "@solar-icons/react/outline";
import { type FC, useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import {
	CustomField,
	Form,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import { useGetSeasonalityQuery } from "@/entities/tour";

import {
	type TSeasonalityFormValues,
	useSeasonalityRemove,
	useSeasonalitySave
} from "../model";
import { areCalendarDatesEqual } from "../model/lib";

interface ISeasonalityInfoProps {
	tourId: string;
}

const SeasonalityInfoBase: FC<ISeasonalityInfoProps> = ({ tourId }) => {
	const { t } = useTranslation("tour_schedule_page");

	const { data: seasonalityPage } = useGetSeasonalityQuery(
		{ page: 1, limit: INTERSECTION_ELEMENTS.TOUR_SEASONALITY, tourId },
		{ skip: !tourId }
	);
	const seasonalityData = seasonalityPage?.data;

	const form = useForm<TSeasonalityFormValues>({
		defaultValues: {
			seasonality: []
		},
		mode: "onSubmit"
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "seasonality"
	});

	const { handleSave, pendingSaveIndex } = useSeasonalitySave({
		tourId,
		form
	});

	const { handleRemove, pendingRemoveIndex } = useSeasonalityRemove({
		tourId,
		form,
		remove
	});

	const isFormSyncedRef = useRef(false);

	useEffect(() => {
		isFormSyncedRef.current = false;
	}, [tourId]);

	useEffect(() => {
		if (!seasonalityData || isFormSyncedRef.current) {
			return;
		}

		form.reset({
			seasonality: seasonalityData.map(({ from, to, ...rest }) => ({
				...rest,
				period: { from, to }
			}))
		});
		isFormSyncedRef.current = true;
	}, [seasonalityData, form, tourId]);

	return (
		<Form {...form}>
			<form className="grid gap-4">
				<div className="flex flex-wrap items-center col-span-2 justify-between gap-3">
					<div className="grid grid-cols-2 font-medium gap-5">
						<p className="sm:w-[350px]">
							{t("seasonality.period.label")}
						</p>
						<p>{t("seasonality.percent.label")}</p>
					</div>
					<LoaderButton
						type="button"
						onClick={() =>
							append({
								period: { from: undefined, to: undefined }
							})
						}
						icon={<AddIcon />}
						label={t("seasonality.buttons.add")}
					/>
				</div>

				<div className="col-span-2 flex flex-col gap-4">
					{fields.map((item, index) => {
						const rowId = form.watch(`seasonality.${index}.id`);
						const period = form.watch(
							`seasonality.${index}.period`
						);
						const from = period?.from;
						const to = period?.to;
						const commission = form.watch(
							`seasonality.${index}.commission`
						);
						const serverRow =
							rowId &&
							seasonalityData?.find((s) => s.id === rowId);
						const isPersisted = Boolean(
							serverRow &&
								from &&
								to &&
								Number(commission) === serverRow.commission &&
								areCalendarDatesEqual(from, serverRow.from) &&
								areCalendarDatesEqual(to, serverRow.to)
						);

						return (
							<div
								key={item.id}
								className="flex items-center gap-3"
							>
								<div className="grid grid-cols-2 gap-5">
									<CustomField
										control={form.control}
										name={`seasonality.${index}.period`}
										fieldType="datePicker"
										hideLabel
										className="mb-0"
										t={t}
									/>
									<CustomField
										control={form.control}
										name={`seasonality.${index}.commission`}
										fieldType="input"
										type="number"
										placeholder="seasonality.percent.placeholder"
										hideLabel
										className="mb-0"
										t={t}
									/>
								</div>
								<LoaderButton
									type="button"
									variant="glass"
									size="icon"
									isLoading={pendingSaveIndex === index}
									aria-label={
										isPersisted
											? t(
													"seasonality.buttons.saved_rule"
												)
											: t("seasonality.buttons.save_rule")
									}
									onClick={() => handleSave(index)}
									icon={
										isPersisted ? (
											<CheckCircleIcon />
										) : (
											<DisketteIcon />
										)
									}
								/>

								<LoaderButton
									type="button"
									variant="destructive_outline"
									size="icon"
									isLoading={pendingRemoveIndex === index}
									onClick={() => handleRemove(index)}
									icon={<TrashBinTrashIcon />}
								/>
							</div>
						);
					})}
				</div>
			</form>
		</Form>
	);
};

export const SeasonalityInfo = withErrorBoundary(SeasonalityInfoBase);
