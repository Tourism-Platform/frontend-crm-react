import { AddIcon } from "@solar-icons/react/bold/add";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Accordion,
	CustomCollapsibleListToolbar,
	LoaderButton,
	useCollapsibleList,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_SUPPLEMENT_ITEMS,
	ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD,
	ENUM_SUPPLEMENT_PRICING_FIELD,
	type TSupplementEditSchema
} from "@/entities/tour";

import { removeWithPriceRow } from "../../../model/remove-with-price-row";
import { ENUM_FORM_SECTION } from "../../model";

import { ItemsCard } from "./items-card";

/** Per-item price rows, index-aligned to the items list. */
const ITEM_PRICE_ROWS_PATH = `${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES}.${ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS}`;

interface IItemsDetailsProps {
	form: UseFormReturn<TSupplementEditSchema>;
}

const ItemsDetailsBase: FC<IItemsDetailsProps> = ({ form }) => {
	const { t } = useTranslation("supplement_edit_page");
	const supplyId = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.ITEMS}.${ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST}`
	});
	const list = useCollapsibleList(fields.length, supplyId);

	const handleAddItem = () => {
		append({
			[ENUM_FORM_SUPPLEMENT_ITEMS.NAME]: ""
		});
		list.openItem(fields.length);
	};

	const handleRemove = (index: number) => {
		removeWithPriceRow(form, remove, ITEM_PRICE_ROWS_PATH, index);
		list.removeItem(index);
	};

	return (
		<div className="grid gap-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h2 className="text-xl">{t("form.items.details.title")}</h2>
				{fields.length > 0 ? (
					<CustomCollapsibleListToolbar
						onExpandAll={list.expandAll}
						onCollapseAll={list.collapseAll}
					/>
				) : null}
			</div>

			<div className="grid gap-4">
				{fields.length > 0 ? (
					<Accordion
						type="multiple"
						value={list.value}
						onValueChange={list.onValueChange}
						className="grid gap-4"
					>
						{fields.map((field, index) => (
							<ItemsCard
								key={field.id}
								form={form}
								index={index}
								onRemove={() => handleRemove(index)}
							/>
						))}
					</Accordion>
				) : null}

				<div>
					<LoaderButton
						type="button"
						onClick={handleAddItem}
						className="gap-2"
						icon={<AddIcon />}
						label={t("form.items.details.form.buttons.add")}
					/>
				</div>
			</div>
		</div>
	);
};

export const ItemsDetails = withErrorBoundary(ItemsDetailsBase);
