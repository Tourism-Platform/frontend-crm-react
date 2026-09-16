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
	ENUM_FORM_TRAIN_FARES,
	ENUM_FORM_TRAIN_SECTION,
	ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD,
	ENUM_TRAIN_PRODUCT_PRICING_FIELD,
	type TTrainProductEditSchema
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import { PER_FARE_MARKUP_FIELD, PER_FARE_ROW_FIELDS_LIST } from "../../model";

interface IPerFareCardProps {
	form: UseFormReturn<TTrainProductEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerFareCard: FC<IPerFareCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const fareName = form.watch(
		`${ENUM_FORM_TRAIN_SECTION.FARES}.${ENUM_FORM_TRAIN_FARES.FARES_LIST}.${index}.${ENUM_FORM_TRAIN_FARES.NAME}`
	);
	const rowFields = PER_FARE_ROW_FIELDS_LIST();
	const rowPath =
		`${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES}.${index}` as const;

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">{fareName}</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div
					className={cn(
						"grid max-w-3xl grid-cols-3 gap-4",
						addMarginSeparately &&
							"max-w-4xl grid-cols-[minmax(0,10rem)_minmax(0,12rem)_minmax(0,14rem)_minmax(0,8rem)]"
					)}
				>
					{rowFields.map(({ key, ...item }, fieldIndex) => (
						<Fragment key={key}>
							{addMarginSeparately &&
							fieldIndex === rowFields.length - 1 ? (
								<CustomInputSelect
									control={form.control}
									name={`${rowPath}.${PER_FARE_MARKUP_FIELD.key}`}
									label={PER_FARE_MARKUP_FIELD.label}
									placeholder={
										PER_FARE_MARKUP_FIELD.placeholder
									}
									selectOptions={[
										...PER_FARE_MARKUP_FIELD.selectOptions
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
					))}
				</div>
				<FeeLinesField
					control={form.control}
					name={`${rowPath}.${ENUM_TRAIN_PRODUCT_FARE_PRICE_ROW_FIELD.FEES}`}
				/>
			</CardContent>
		</Card>
	);
};
