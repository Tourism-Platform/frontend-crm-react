import { Check, Loader2, Save, Trash } from "lucide-react";
import { type FC, useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, Form, withErrorBoundary } from "@/shared/ui";

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

	const { data: seasonalityData } = useGetSeasonalityQuery(tourId, {
		skip: !tourId
	});

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
				<div className="flex items-center  col-span-2 justify-between">
					<div className="grid grid-cols-2 font-medium gap-5">
						<p className="w-[350px]">
							{t("seasonality.period.label")}
						</p>
						<p>{t("seasonality.percent.label")}</p>
					</div>
					<Button
						type="button"
						variant="outline"
						onClick={() =>
							append({
								period: { from: undefined, to: undefined }
							})
						}
					>
						{t("seasonality.buttons.add")}
					</Button>
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
								className="flex items-center gap-3  "
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
								<Button
									type="button"
									variant="outline"
									size={"icon"}
									disabled={pendingSaveIndex === index}
									aria-label={
										isPersisted
											? t(
													"seasonality.buttons.saved_rule"
												)
											: t("seasonality.buttons.save_rule")
									}
									onClick={() => handleSave(index)}
								>
									{pendingSaveIndex === index ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : isPersisted ? (
										<Check className="text-green-600" />
									) : (
										<Save className="text-muted-foreground" />
									)}
								</Button>

								<Button
									type="button"
									variant="destructive"
									size={"icon"}
									disabled={pendingRemoveIndex === index}
									onClick={() => handleRemove(index)}
								>
									{pendingRemoveIndex === index ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Trash />
									)}
								</Button>
							</div>
						);
					})}
				</div>
			</form>
		</Form>
	);
};

export const SeasonalityInfo = withErrorBoundary(SeasonalityInfoBase);
