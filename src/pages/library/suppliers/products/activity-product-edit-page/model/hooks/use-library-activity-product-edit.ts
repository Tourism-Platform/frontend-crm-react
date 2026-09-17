import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	ENUM_FORM_ACTIVITY_SECTION,
	type ENUM_FORM_ACTIVITY_SECTION_TYPE,
	ENUM_FORM_ACTIVITY_VARIANTS,
	ENUM_SUPPLIER_TYPE,
	type IActivityProduct,
	type TActivityProductEditSchema,
	type TSupplierProduct,
	useCreateSupplierProductMutation,
	useUpdateSupplierProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryActivityProductEdit = ({
	supplierId,
	productId,
	isCreate,
	form,
	product,
	onCreated
}: {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	form: UseFormReturn<TActivityProductEditSchema>;
	product?: IActivityProduct;
	onCreated: (productId: string, typ: TSupplierProduct["typ"]) => void;
}) => {
	const { t, i18n } = useTranslation("activity_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const [createSupplierProduct, { isLoading: isCreating }] =
		useCreateSupplierProductMutation();
	const [updateSupplierProduct, { isLoading: isUpdating }] =
		useUpdateSupplierProductMutation();
	const [updateVariant, { isLoading: isUpdatingVariant }] =
		useUpdateVariantMutation();
	const isLoading = isCreating || isUpdating || isUpdatingVariant;

	const createSectionSubmit = async (
		section?: ENUM_FORM_ACTIVITY_SECTION_TYPE
	) => {
		if (!section) return;
		if (section !== ENUM_FORM_ACTIVITY_SECTION.GENERAL && isCreate) {
			return;
		}

		const isValid = await form.trigger(section);
		if (!isValid) return;

		try {
			if (section === ENUM_FORM_ACTIVITY_SECTION.GENERAL) {
				const values =
					form.getValues()[ENUM_FORM_ACTIVITY_SECTION.GENERAL];

				if (isCreate) {
					const created = await createSupplierProduct({
						typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
						supplierId,
						values,
						language
					}).unwrap();
					toast.success(t("form.toasts.create.success"));
					onCreated(created.id, created.typ);
					return;
				}

				await updateSupplierProduct({
					typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
					supplierId,
					productId,
					values,
					language
				}).unwrap();
			} else {
				if (!product) return;

				if (section === ENUM_FORM_ACTIVITY_SECTION.VARIANTS) {
					const rows =
						form.getValues()[ENUM_FORM_ACTIVITY_SECTION.VARIANTS][
							ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST
						];

					await Promise.all(
						rows.map((row) =>
							updateVariant({
								typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
								supplierId,
								productId,
								variantId:
									row[ENUM_FORM_ACTIVITY_VARIANTS.VARIANT_ID],
								row,
								existing: product
							}).unwrap()
						)
					);
				}
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				section === ENUM_FORM_ACTIVITY_SECTION.GENERAL && isCreate
					? t("form.toasts.create.error")
					: t("form.toasts.save.error")
			);
			console.error(error);
		}
	};

	return {
		createSectionSubmit,
		isLoading
	};
};
