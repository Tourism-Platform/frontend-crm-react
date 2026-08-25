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
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	type ENUM_GUIDE_TYPE_TYPE,
	GUIDE_TYPE_LABELS,
	type TGuideEditSchema
} from "@/entities/tour";

import { FeeLinesField } from "@/features/pricing";

import {
	ENUM_FORM_SECTION,
	PER_GUIDE_MARKUP_FIELD,
	PER_GUIDE_ROW_FIELDS_LIST
} from "../../model";

interface IPerGuideCardProps {
	form: UseFormReturn<TGuideEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerGuideCard: FC<IPerGuideCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation(["guide_edit_page", "options"]);
	const rowFields = PER_GUIDE_ROW_FIELDS_LIST();
	const guideType = form.watch(
		`${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.GUIDES_LIST}.${index}.${ENUM_FORM_GUIDES.GUIDE_TYPE}`
	) as ENUM_GUIDE_TYPE_TYPE | undefined;
	const rowPath =
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES}.${index}` as const;

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
			<CardContent className="grid gap-4">
				<div
					className={cn(
						"grid max-w-3xl grid-cols-3 gap-4",
						addMarginSeparately &&
							"max-w-4xl grid-cols-[minmax(0,10rem)_minmax(0,10rem)_minmax(0,14rem)_minmax(0,8rem)]"
					)}
				>
					{rowFields.map(({ key, ...item }, fieldIndex) => (
						<Fragment key={key}>
							{addMarginSeparately &&
							fieldIndex === rowFields.length - 1 ? (
								<CustomInputSelect
									control={form.control}
									name={`${rowPath}.${PER_GUIDE_MARKUP_FIELD.key}`}
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
								name={`${rowPath}.${key}`}
								t={t}
								{...item}
							/>
						</Fragment>
					))}
				</div>
				<FeeLinesField
					control={form.control}
					name={`${rowPath}.${ENUM_GUIDE_PRICE_ROW_FIELD.FEES}`}
				/>
			</CardContent>
		</Card>
	);
};
