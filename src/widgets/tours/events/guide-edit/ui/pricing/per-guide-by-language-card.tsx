import { Plus, Trash2 } from "lucide-react";
import { type FC, Fragment } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CustomField,
	CustomInputSelect
} from "@/shared/ui";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	type ENUM_GUIDE_TYPE_TYPE,
	GUIDE_TYPE_LABELS,
	type TGuideEditSchema
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	PER_GUIDE_CATEGORY_ROW_FIELDS_LIST,
	PER_GUIDE_MARKUP_FIELD
} from "../../model";

interface IPerGuideByLanguageCardProps {
	form: UseFormReturn<TGuideEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerGuideByLanguageCard: FC<IPerGuideByLanguageCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("guide_edit_page");
	const guideType = form.watch(
		`${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.GUIDES_LIST}.${index}.${ENUM_FORM_GUIDES.GUIDE_TYPE}`
	) as ENUM_GUIDE_TYPE_TYPE | undefined;

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES}.${index}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES}`
	});
	const categoryRowFields = PER_GUIDE_CATEGORY_ROW_FIELDS_LIST();

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">
					{guideType
						? t(GUIDE_TYPE_LABELS[guideType], {
								ns: "options"
							})
						: null}
				</h4>
			</CardHeader>
			<CardContent className="grid">
				{fields.map((field, categoryIndex) => (
					<div
						key={field.id}
						className={cn(
							"grid grid-cols-[1fr_1fr_1fr_0.5fr_auto] gap-3 items-center",
							addMarginSeparately &&
								"grid-cols-[1fr_1fr_1fr_1.5fr_0.5fr_auto]"
						)}
					>
						{categoryRowFields.map(
							({ key, ...item }, fieldIndex) => (
								<Fragment key={key}>
									{addMarginSeparately &&
									fieldIndex ===
										categoryRowFields.length - 1 ? (
										<CustomInputSelect
											control={form.control}
											name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES}.${index}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES}.${categoryIndex}.${PER_GUIDE_MARKUP_FIELD.key}`}
											label={PER_GUIDE_MARKUP_FIELD.label}
											placeholder={
												PER_GUIDE_MARKUP_FIELD.placeholder
											}
											selectOptions={[
												...PER_GUIDE_MARKUP_FIELD.selectOptions
											]}
											t={t}
										/>
									) : null}
									<CustomField
										control={form.control}
										name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES}.${index}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES}.${categoryIndex}.${key}`}
										t={t}
										{...item}
									/>
								</Fragment>
							)
						)}
						<Button
							type="button"
							variant={"destructive"}
							size={"icon"}
							onClick={() => remove(categoryIndex)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}
				<Button
					type="button"
					variant="outline"
					className="w-fit"
					onClick={() =>
						append({
							[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: "",
							[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: null,
							[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: null,
							[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]: "",
							[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: null
						})
					}
				>
					<Plus className="mr-2 h-4 w-4" />
					{t("form.pricing.form.per_guide.buttons.add_language")}
				</Button>
			</CardContent>
		</Card>
	);
};
