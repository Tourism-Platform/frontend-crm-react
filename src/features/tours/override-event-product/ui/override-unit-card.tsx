import { type FC, Fragment } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CardHeader,
	CustomField,
	CustomInputSelect
} from "@/shared/ui";

import {
	ENUM_FORM_OVERRIDE_PRODUCT,
	type TOverrideProductFormValues
} from "@/entities/tour";

import { FeeLinesField } from "@/features/pricing";

import {
	FORM_OVERRIDE_UNIT_ROW_FIELDS_LIST,
	OVERRIDE_MARKUP_FIELD,
	getUnitChargeOptions
} from "../model";

interface IOverrideUnitCardProps {
	form: UseFormReturn<TOverrideProductFormValues>;
	index: number;
	name: string;
	unitChargeOptions: ReturnType<typeof getUnitChargeOptions>;
	addMarginSeparately: boolean;
}

export const OverrideUnitCard: FC<IOverrideUnitCardProps> = ({
	form,
	index,
	name,
	unitChargeOptions,
	addMarginSeparately
}) => {
	const { t } = useTranslation("common_events");
	const showUnitCharge = unitChargeOptions.length > 1;
	const rowPath = `${ENUM_FORM_OVERRIDE_PRODUCT.UNITS}.${index}` as const;

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">{name}</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div
					className={cn(
						"grid w-full min-w-0 gap-4",
						showUnitCharge &&
							addMarginSeparately &&
							"grid-cols-[0.5fr_1fr_0.5fr_0.5fr]",
						showUnitCharge &&
							!addMarginSeparately &&
							"grid-cols-[0.5fr_1fr_0.5fr]",
						!showUnitCharge &&
							addMarginSeparately &&
							"grid-cols-[1fr_0.5fr_0.5fr]",
						!showUnitCharge &&
							!addMarginSeparately &&
							"grid-cols-[1fr_0.5fr]"
					)}
				>
					{showUnitCharge ? (
						<CustomField
							control={form.control}
							name={`${rowPath}.charge_typ`}
							fieldType="select"
							options={unitChargeOptions.map((option) => ({
								value: option.value,
								label: t(option.label)
							}))}
							label="override_product.dialog.fields.unit_charge.label"
							t={t}
						/>
					) : null}
					{FORM_OVERRIDE_UNIT_ROW_FIELDS_LIST.map(
						({ key, ...item }, fieldIndex) => (
							<Fragment key={key}>
								{addMarginSeparately &&
								fieldIndex ===
									FORM_OVERRIDE_UNIT_ROW_FIELDS_LIST.length -
										1 ? (
									<CustomInputSelect
										control={form.control}
										name={`${rowPath}.${OVERRIDE_MARKUP_FIELD.key}`}
										label={OVERRIDE_MARKUP_FIELD.label}
										placeholder={
											OVERRIDE_MARKUP_FIELD.placeholder
										}
										selectOptions={[
											...OVERRIDE_MARKUP_FIELD.selectOptions
										]}
										t={t}
									/>
								) : null}
								<CustomField
									control={form.control}
									name={`${rowPath}.${key}`}
									t={t}
									{...item}
								/>
							</Fragment>
						)
					)}
				</div>
				<FeeLinesField
					control={form.control}
					name={`${rowPath}.${ENUM_FORM_OVERRIDE_PRODUCT.FEES}`}
				/>
			</CardContent>
		</Card>
	);
};
