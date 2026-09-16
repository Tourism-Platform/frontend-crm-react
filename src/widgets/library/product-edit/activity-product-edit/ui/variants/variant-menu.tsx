import { Plus, Trash2 } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_ACTIVITY_SUB_TYPE,
	ENUM_FORM_ACTIVITY_MENU,
	ENUM_FORM_ACTIVITY_PRODUCT,
	ENUM_FORM_ACTIVITY_SECTION,
	ENUM_FORM_ACTIVITY_VARIANT,
	ENUM_FORM_ACTIVITY_VARIANTS,
	type TActivityProductEditSchema
} from "@/entities/supplier";

import { ACTIVITY_VARIANT_MENU_FIELDS_LIST } from "../../model";

interface IVariantMenuProps {
	form: UseFormReturn<TActivityProductEditSchema>;
	index: number;
}

const VariantMenuBase: FC<IVariantMenuProps> = ({ form, index }) => {
	const { t } = useTranslation("activity_product_edit_page");
	const subtype = form.watch(
		`${ENUM_FORM_ACTIVITY_SECTION.GENERAL}.${ENUM_FORM_ACTIVITY_PRODUCT.SUB_TYP}`
	);
	const menuPath =
		`${ENUM_FORM_ACTIVITY_SECTION.VARIANTS}.${ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST}.${index}.${ENUM_FORM_ACTIVITY_VARIANT.MENU}` as const;
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: menuPath
	});

	if (subtype !== ENUM_ACTIVITY_SUB_TYPE.FOOD) {
		return null;
	}

	return (
		<div className="grid gap-4 col-span-3">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium">
					{t("form.variants.menu.title")}
				</h3>
				<Button
					type="button"
					variant="outline"
					onClick={() =>
						append({
							[ENUM_FORM_ACTIVITY_MENU.NAME]: "",
							[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: ""
						})
					}
				>
					<Plus className="mr-2 h-4 w-4" />
					{t("form.variants.menu.buttons.add")}
				</Button>
			</div>
			{fields.map((field, menuIndex) => (
				<div
					key={field.id}
					className="grid grid-cols-[1fr_1fr_auto] gap-3 items-start"
				>
					{ACTIVITY_VARIANT_MENU_FIELDS_LIST().map(
						({ key, ...item }) => (
							<CustomField
								key={key}
								control={form.control}
								name={`${menuPath}.${menuIndex}.${key}`}
								t={t}
								{...item}
							/>
						)
					)}
					<Button
						type="button"
						variant="destructive"
						size="icon"
						className="mt-7"
						onClick={() => remove(menuIndex)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
		</div>
	);
};

export const VariantMenu = withErrorBoundary(VariantMenuBase);
