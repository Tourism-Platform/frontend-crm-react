import { type FC } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomCollapsibleListItem, CustomField } from "@/shared/ui";

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
	const itemPath =
		`${ENUM_FORM_SECTION.ITEMS}.${ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST}.${index}` as const;
	const name = useWatch({
		control: form.control,
		name: `${itemPath}.${ENUM_FORM_SUPPLEMENT_ITEMS.NAME}`
	});

	return (
		<CustomCollapsibleListItem
			value={String(index)}
			control={form.control}
			name={itemPath}
			title={t("form.items.details.item", { index: index + 1 })}
			description={name}
			actions={<ItemsMenu onRemove={onRemove} />}
		>
			<div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
				{ITEMS_DATA_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={`${itemPath}.${key}`}
						t={t}
						{...item}
					/>
				))}
			</div>
		</CustomCollapsibleListItem>
	);
};
