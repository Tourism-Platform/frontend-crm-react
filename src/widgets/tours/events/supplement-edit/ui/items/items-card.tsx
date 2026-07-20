import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_SUPPLEMENT_ITEMS,
	type TSupplementEditSchema
} from "@/entities/tour";

import { ENUM_FORM_SECTION, ITEMS_DATA_LIST } from "../../model";

import { ItemsMenu } from "./items-menu";

interface IItemsCardProps {
	form: UseFormReturn<TSupplementEditSchema>;
	index: number;
	onRemove: () => void;
}

export const ItemsCard: FC<IItemsCardProps> = ({ form, index, onRemove }) => {
	const { t } = useTranslation("supplement_edit_page");

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				{t("form.items.details.item", { index: index + 1 })}
			</CardHeader>
			<CardContent>
				<div className="absolute top-0 right-0">
					<ItemsMenu onRemove={onRemove} />
				</div>

				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{ITEMS_DATA_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={`${ENUM_FORM_SECTION.ITEMS}.${ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST}.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
