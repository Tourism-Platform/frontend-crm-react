import { Check, Loader2, Trash } from "lucide-react";
import { type FC, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Form, Input, withErrorBoundary } from "@/shared/ui";
import DatePicker from "@/shared/ui/date-picker";

import { type ISeasonality, useGetSeasonalityQuery } from "@/entities/tour";

import { useSeasonalityRemove, useSeasonalitySave } from "../model";

interface ISeasonalityInfoProps {
	tourId: string;
}

const SeasonalityInfoBase: FC<ISeasonalityInfoProps> = ({ tourId }) => {
	const { t } = useTranslation("tour_schedule_page");

	const { data: seasonalityData } = useGetSeasonalityQuery(tourId, {
		skip: !tourId
	});

	const form = useForm<{
		seasonality: Partial<ISeasonality>[];
	}>({
		defaultValues: {
			seasonality: []
		},
		mode: "onSubmit"
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "seasonality"
	});

	const { handleSave, isCheckedPending } = useSeasonalitySave({
		tourId,
		form
	});

	const { handleRemove, isRemoving } = useSeasonalityRemove({
		tourId,
		form,
		remove
	});

	useEffect(() => {
		if (seasonalityData) {
			form.reset({
				seasonality: seasonalityData
			});
		}
	}, [seasonalityData, form]);

	return (
		<Form {...form}>
			<form>
				{/* Заголовки */}
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
						onClick={() => append({})}
					>
						{t("seasonality.buttons.add")}
					</Button>
				</div>

				{/* Список правил */}
				<div className="col-span-2 flex flex-col gap-4">
					{fields.map((item, index) => (
						<div
							key={item.id}
							className="flex items-center gap-3  "
						>
							{/* Дата */}
							<div className="grid grid-cols-2 gap-5">
								<DatePicker
									from={form.watch(
										`seasonality.${index}.from`
									)}
									to={form.watch(`seasonality.${index}.to`)}
									onChange={({ from, to }) => {
										form.setValue(
											`seasonality.${index}.from`,
											from
										);
										form.setValue(
											`seasonality.${index}.to`,
											to
										);
									}}
								/>

								{/* Процент */}
								<Controller
									control={form.control}
									name={`seasonality.${index}.commission`}
									render={({ field }) => (
										<Input
											{...field}
											placeholder={t(
												"seasonality.percent.placeholder"
											)}
											type="number"
										/>
									)}
								/>
							</div>
							{/* Сохранить правило */}
							<Button
								type="button"
								variant="outline"
								size={"icon"}
								disabled={isRemoving}
								onClick={() => handleSave(index)}
							>
								{isCheckedPending ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Check className="text-green-600" />
								)}
							</Button>

							{/* Удалить правило */}
							<Button
								type="button"
								variant="destructive"
								size={"icon"}
								disabled={isCheckedPending}
								onClick={() => handleRemove(index)}
							>
								{isRemoving ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Trash />
								)}
							</Button>
						</div>
					))}
				</div>
			</form>
		</Form>
	);
};

export const SeasonalityInfo = withErrorBoundary(SeasonalityInfoBase);
