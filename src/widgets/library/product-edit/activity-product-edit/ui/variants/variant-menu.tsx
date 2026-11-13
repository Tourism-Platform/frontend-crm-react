import { AddIcon } from "@solar-icons/react/bold/add";
import { TrashBinTrashIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomField,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

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
		<div className="grid gap-4 sm:col-span-3">
			<div className="flex items-center justify-between">
				<h3 className="text-lg">{t("form.variants.menu.title")}</h3>
				<LoaderButton
					type="button"
					onClick={() =>
						append({
							[ENUM_FORM_ACTIVITY_MENU.NAME]: "",
							[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: ""
						})
					}
					icon={<AddIcon />}
					label={t("form.variants.menu.buttons.add")}
				/>
			</div>
			{fields.map((field, menuIndex) => (
				<div
					key={field.id}
					className="grid grid-cols-1 gap-3 items-start sm:grid-cols-[1fr_1fr_auto]"
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
						variant="destructive_outline"
						size="icon"
						className="mt-7"
						onClick={() => remove(menuIndex)}
					>
						<TrashBinTrashIcon />
					</Button>
				</div>
			))}
		</div>
	);
};

export const VariantMenu = withErrorBoundary(VariantMenuBase);
