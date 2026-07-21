import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import { ENUM_FORM_GUIDES, type TGuideEditSchema } from "@/entities/tour";

import { ENUM_FORM_SECTION, GUIDES_DATA_LIST } from "../../model";

interface IGuidesCardProps {
	form: UseFormReturn<TGuideEditSchema>;
	index: number;
	onRemove: () => void;
}

export const GuidesCard: FC<IGuidesCardProps> = ({ form, index }) => {
	const { t } = useTranslation("guide_edit_page");

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				{t("form.guides.details.guide_item", { index: index + 1 })}
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{GUIDES_DATA_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={`${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.GUIDES_LIST}.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
