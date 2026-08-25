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
	ENUM_FORM_SUPPLEMENT_ITEMS,
	ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD,
	ENUM_SUPPLEMENT_PRICE_ROW_FIELD,
	ENUM_SUPPLEMENT_PRICING_FIELD,
	type TSupplementEditSchema
} from "@/entities/tour";

import { FeeLinesField } from "@/features/pricing";

import {
	ENUM_FORM_SECTION,
	PER_ITEM_MARKUP_FIELD,
	PER_ITEM_ROW_FIELDS_LIST
} from "../../model";

interface IPerItemCardProps {
	form: UseFormReturn<TSupplementEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerItemCard: FC<IPerItemCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("supplement_edit_page");
	const itemName = form.watch(
		`${ENUM_FORM_SECTION.ITEMS}.${ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST}.${index}.${ENUM_FORM_SUPPLEMENT_ITEMS.NAME}`
	);
	const rowPath =
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES}.${ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS}.${index}` as const;

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">{itemName || null}</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div
					className={cn(
						"grid max-w-xl grid-cols-2 gap-4",
						addMarginSeparately &&
							"max-w-3xl grid-cols-[minmax(0,12rem)_minmax(0,14rem)_minmax(0,8rem)]"
					)}
				>
					{PER_ITEM_ROW_FIELDS_LIST.map(
						({ key, ...item }, fieldIndex) => (
							<Fragment key={key}>
								{addMarginSeparately &&
								fieldIndex ===
									PER_ITEM_ROW_FIELDS_LIST.length - 1 ? (
									<CustomInputSelect
										control={form.control}
										name={`${rowPath}.${PER_ITEM_MARKUP_FIELD.key}`}
										label={PER_ITEM_MARKUP_FIELD.label}
										placeholder={
											PER_ITEM_MARKUP_FIELD.placeholder
										}
										selectOptions={[
											...PER_ITEM_MARKUP_FIELD.selectOptions
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
					name={`${rowPath}.${ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES}`}
				/>
			</CardContent>
		</Card>
	);
};
