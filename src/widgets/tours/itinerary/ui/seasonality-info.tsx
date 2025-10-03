import { Trash } from "lucide-react";
import { type FC } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Form, Input } from "@/shared/ui";
import DatePickerDemo from "@/shared/ui/range";

export const SeasonalityInfo: FC = () => {
	const { t } = useTranslation("tour_itinerary_page");

	const form = useForm<{
		seasonality: {
			from: string;
			to: string;
			percent: string;
		}[];
	}>({
		defaultValues: {
			seasonality: [{ from: "", to: "", percent: "" }]
		},
		mode: "onSubmit"
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "seasonality"
	});

	// function onSubmit(data: ) {
	// 	console.log("Form submitted:", data);
	// }

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
						onClick={() =>
							append({ from: "", to: "", percent: "" })
						}
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
								<DatePickerDemo />

								{/* Процент */}
								<Controller
									control={form.control}
									name={`seasonality.${index}.percent`}
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
							{/* Удалить правило */}
							<Button
								type="button"
								variant="destructive"
								size={"icon"}
								onClick={() => remove(index)}
							>
								<Trash />
							</Button>
						</div>
					))}
				</div>
			</form>
		</Form>
	);
};
