import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import {
	type Control,
	type FieldValues,
	type Path,
	useFieldArray,
	useWatch
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField } from "@/shared/ui";

import { useAcceptedCurrencyOptions } from "@/entities/finance";
import {
	ENUM_EXTRA_COST_FIELD,
	ENUM_EXTRA_COST_MODE,
	type IExtraCostFormRow,
	createEmptyExtraCostRow
} from "@/entities/tour";

const EXTRA_COST_ROW_GRID =
	"grid grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_7rem_7rem_2.25rem] gap-x-3 gap-y-2 items-center";

interface IExtraCostsFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	disabled?: boolean;
}

/** Named cost lines inside a charge: same pax and days, under its markup. */
export const ExtraCostsField = <T extends FieldValues>({
	control,
	name,
	disabled
}: IExtraCostsFieldProps<T>) => {
	const { currencyOptions } = useAcceptedCurrencyOptions();
	const { t } = useTranslation("common_events");
	const { fields, append, remove } = useFieldArray({
		control,
		name: name as never
	});
	const rows = useWatch({ control, name }) as IExtraCostFormRow[] | undefined;

	const modeOptions = useMemo(
		() =>
			Object.values(ENUM_EXTRA_COST_MODE).map((mode) => ({
				label: t(`extra_costs.modes.${mode}`),
				value: mode
			})),
		[t]
	);

	return (
		<div className="flex flex-col gap-3">
			<div className="grid gap-1">
				<div className="text-sm font-medium">
					{t("extra_costs.title")}
				</div>
				<p className="text-xs text-muted-foreground">
					{t("extra_costs.hint")}
				</p>
			</div>
			{fields.length > 0 ? (
				<div className={`${EXTRA_COST_ROW_GRID} px-0.5`}>
					<span className="text-xs font-medium text-muted-foreground">
						{t("extra_costs.fields.name.label")}
					</span>
					<span className="text-xs font-medium text-muted-foreground">
						{t("extra_costs.fields.mode.label")}
					</span>
					<span className="text-xs font-medium text-muted-foreground">
						{t("extra_costs.fields.cost.label")}
					</span>
					<span className="text-xs font-medium text-muted-foreground">
						{t("extra_costs.fields.currency.label")}
					</span>
					<span aria-hidden />
				</div>
			) : null}
			{fields.map((field, index) => {
				// A line in a shape the form cannot edit is kept as read.
				const isRaw = !!rows?.[index]?.[ENUM_EXTRA_COST_FIELD.RAW];
				const isLocked = disabled || isRaw;

				return (
					<div key={field.id} className={EXTRA_COST_ROW_GRID}>
						<CustomField
							control={control}
							name={
								`${name}.${index}.${ENUM_EXTRA_COST_FIELD.NAME}` as Path<T>
							}
							fieldType="input"
							label="extra_costs.fields.name.label"
							placeholder="extra_costs.fields.name.placeholder"
							t={t}
							disabled={isLocked}
							hideLabel
							className="min-w-0"
						/>
						{isRaw ? (
							<span className="col-span-3 text-xs text-muted-foreground">
								{t("extra_costs.unsupported")}
							</span>
						) : (
							<>
								<CustomField
									control={control}
									name={
										`${name}.${index}.${ENUM_EXTRA_COST_FIELD.MODE}` as Path<T>
									}
									fieldType="select"
									label="extra_costs.fields.mode.label"
									placeholder="extra_costs.fields.mode.placeholder"
									options={modeOptions}
									t={t}
									disabled={isLocked}
									hideLabel
									className="min-w-0"
								/>
								<CustomField
									control={control}
									name={
										`${name}.${index}.${ENUM_EXTRA_COST_FIELD.COST}` as Path<T>
									}
									fieldType="input"
									type="number"
									label="extra_costs.fields.cost.label"
									placeholder="extra_costs.fields.cost.placeholder"
									t={t}
									disabled={isLocked}
									hideLabel
									className="min-w-0"
								/>
								<CustomField
									control={control}
									name={
										`${name}.${index}.${ENUM_EXTRA_COST_FIELD.CURRENCY}` as Path<T>
									}
									fieldType="select"
									label="extra_costs.fields.currency.label"
									placeholder="extra_costs.fields.currency.placeholder"
									options={currencyOptions}
									t={t}
									disabled={isLocked}
									hideLabel
									className="min-w-0"
								/>
							</>
						)}
						<Button
							type="button"
							variant="destructive"
							size="icon"
							className="shrink-0"
							onClick={() => remove(index)}
							disabled={disabled}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				);
			})}
			<Button
				type="button"
				variant="outline"
				className="w-fit"
				onClick={() => append(createEmptyExtraCostRow() as never)}
				disabled={disabled}
			>
				<Plus className="mr-2 h-4 w-4" />
				{t("extra_costs.add")}
			</Button>
		</div>
	);
};
