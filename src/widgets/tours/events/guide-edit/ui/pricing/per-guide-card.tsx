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
	ENUM_GUIDE_PRICING_FIELD,
	type ENUM_GUIDE_TYPE_TYPE,
	GUIDE_TYPE_LABELS,
	type TGuideEditSchema
} from "@/entities/tour";

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
	const { t } = useTranslation("guide_edit_page");
	const guideType = form.watch(
		`${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.GUIDES_LIST}.${index}.${ENUM_FORM_GUIDES.GUIDE_TYPE}`
	) as ENUM_GUIDE_TYPE_TYPE | undefined;

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
						"grid grid-cols-[1fr_1fr_1fr] gap-5",
						addMarginSeparately && "grid-cols-[1fr_1fr_1.5fr_0.5fr]"
					)}
				>
					{PER_GUIDE_ROW_FIELDS_LIST.map(
						({ key, ...item }, fieldIndex) => (
							<Fragment key={key}>
								{addMarginSeparately &&
								fieldIndex ===
									PER_GUIDE_ROW_FIELDS_LIST.length - 1 ? (
									<CustomInputSelect
										control={form.control}
										name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES}.${index}.${PER_GUIDE_MARKUP_FIELD.key}`}
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
									name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}.${ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES}.${index}.${key}`}
									t={t}
									{...item}
								/>
							</Fragment>
						)
					)}
				</div>
			</CardContent>
		</Card>
	);
};
