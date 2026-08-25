import { Plus, Trash2 } from "lucide-react";
import {
	type Control,
	type FieldValues,
	type Path,
	useFieldArray
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, CustomInputSelect } from "@/shared/ui";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import { ENUM_FEE_FIELD, createEmptyFeeRow } from "@/entities/tour";

interface IFeeLinesFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	disabled?: boolean;
}

export const FeeLinesField = <T extends FieldValues>({
	control,
	name,
	disabled
}: IFeeLinesFieldProps<T>) => {
	const { t } = useTranslation("common_events");
	const { fields, append, remove } = useFieldArray({
		control,
		name: name as never
	});

	return (
		<div className="flex flex-col gap-3">
			<div className="text-sm font-medium">{t("fees.title")}</div>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className="grid grid-cols-[1fr_1fr_0.7fr_1fr_auto] gap-2 items-end"
				>
					<CustomField
						control={control}
						name={
							`${name}.${index}.${ENUM_FEE_FIELD.NAME}` as Path<T>
						}
						fieldType="input"
						label="fees.fields.name.label"
						placeholder="fees.fields.name.placeholder"
						t={t}
						disabled={disabled}
					/>
					<CustomField
						control={control}
						name={
							`${name}.${index}.${ENUM_FEE_FIELD.COST}` as Path<T>
						}
						fieldType="input"
						type="number"
						label="fees.fields.cost.label"
						placeholder="fees.fields.cost.placeholder"
						t={t}
						disabled={disabled}
					/>
					<CustomInputSelect
						control={control}
						name={
							`${name}.${index}.${ENUM_FEE_FIELD.CURRENCY}` as Path<T>
						}
						label="fees.fields.currency.label"
						placeholder="fees.fields.currency.placeholder"
						selectOptions={[...CURRENCY_OPTIONS]}
						t={t}
						disabled={disabled}
					/>
					<CustomField
						control={control}
						name={
							`${name}.${index}.${ENUM_FEE_FIELD.DESCRIPTION}` as Path<T>
						}
						fieldType="input"
						label="fees.fields.description.label"
						placeholder="fees.fields.description.placeholder"
						t={t}
						disabled={disabled}
					/>
					<Button
						type="button"
						variant="destructive"
						size="icon"
						onClick={() => remove(index)}
						disabled={disabled}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
			<Button
				type="button"
				variant="outline"
				className="w-fit"
				onClick={() => append(createEmptyFeeRow() as never)}
				disabled={disabled}
			>
				<Plus className="mr-2 h-4 w-4" />
				{t("fees.add")}
			</Button>
		</div>
	);
};
