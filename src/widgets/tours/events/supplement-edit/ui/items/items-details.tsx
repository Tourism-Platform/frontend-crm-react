import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_SUPPLEMENT_ITEMS,
	type TSupplementEditSchema
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

import { ItemsCard } from "./items-card";

interface IItemsDetailsProps {
	form: UseFormReturn<TSupplementEditSchema>;
}

const ItemsDetailsBase: FC<IItemsDetailsProps> = ({ form }) => {
	const { t } = useTranslation("supplement_edit_page");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.ITEMS}.${ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST}`
	});

	const handleAddItem = () => {
		append({
			[ENUM_FORM_SUPPLEMENT_ITEMS.NAME]: "",
			[ENUM_FORM_SUPPLEMENT_ITEMS.DESCRIPTION]: ""
		});
	};

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.items.details.title")}</h2>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<ItemsCard
						key={field.id}
						form={form}
						index={index}
						onRemove={() => remove(index)}
					/>
				))}

				<div>
					<Button
						variant="outline"
						type="button"
						onClick={handleAddItem}
						className="gap-2"
					>
						<p>{t("form.items.details.form.buttons.add")}</p>
						<PlusIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export const ItemsDetails = withErrorBoundary(ItemsDetailsBase);
