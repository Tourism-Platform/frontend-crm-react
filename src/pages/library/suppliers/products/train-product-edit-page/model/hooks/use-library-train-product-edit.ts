import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	ENUM_FORM_TRAIN_FARES,
	ENUM_FORM_TRAIN_SECTION,
	type ENUM_FORM_TRAIN_SECTION_TYPE,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRAIN_PRICING,
	type ITrainProduct,
	type TSupplierProduct,
	type TTrainProductEditSchema,
	isTrainWholePricingType,
	useCreateSupplierProductMutation,
	useSwitchSupplierProductPricingMutation,
	useUpdateSupplierProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryTrainProductEdit = ({
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
	form: UseFormReturn<TTrainProductEditSchema>;
	product?: ITrainProduct;
	onCreated: (productId: string, typ: TSupplierProduct["typ"]) => void;
}) => {
	const { t, i18n } = useTranslation("train_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const [createSupplierProduct, { isLoading: isCreating }] =
		useCreateSupplierProductMutation();
	const [updateSupplierProduct, { isLoading: isUpdating }] =
		useUpdateSupplierProductMutation();
	const [updateVariant, { isLoading: isUpdatingVariant }] =
		useUpdateVariantMutation();
	const [switchSupplierProductPricing, { isLoading: isSwitching }] =
		useSwitchSupplierProductPricingMutation();
	const isLoading =
		isCreating || isUpdating || isUpdatingVariant || isSwitching;

	const createSectionSubmit = async (
		section?: ENUM_FORM_TRAIN_SECTION_TYPE
	) => {
		if (!section) return;
		if (section !== ENUM_FORM_TRAIN_SECTION.GENERAL && isCreate) {
			return;
		}

		const isValid = await form.trigger(section);
		if (!isValid) return;

		try {
			if (section === ENUM_FORM_TRAIN_SECTION.GENERAL) {
				const values =
					form.getValues()[ENUM_FORM_TRAIN_SECTION.GENERAL];

				if (isCreate) {
					const created = await createSupplierProduct({
						typ: ENUM_SUPPLIER_TYPE.TRAIN,
						supplierId,
						values,
						language
					}).unwrap();
					toast.success(t("form.toasts.create.success"));
					onCreated(created.id, created.typ);
					return;
				}

				await updateSupplierProduct({
					typ: ENUM_SUPPLIER_TYPE.TRAIN,
					supplierId,
					productId,
					values,
					language,
					existing: product
				}).unwrap();
			} else {
				if (!product) return;

				if (section === ENUM_FORM_TRAIN_SECTION.FARES) {
					const rows =
						form.getValues()[ENUM_FORM_TRAIN_SECTION.FARES][
							ENUM_FORM_TRAIN_FARES.FARES_LIST
						];

					await Promise.all(
						rows.map((row) =>
							updateVariant({
								typ: ENUM_SUPPLIER_TYPE.TRAIN,
								supplierId,
								productId,
								variantId:
									row[ENUM_FORM_TRAIN_FARES.VARIANT_ID],
								row,
								existing: product
							}).unwrap()
						)
					);
				} else if (section === ENUM_FORM_TRAIN_SECTION.PRICING) {
					const values = form.getValues();
					if (
						isTrainWholePricingType(values.pricing.pricing_type) &&
						product.pricing !== ENUM_TRAIN_PRICING.WHOLE
					) {
						toast.warning(t("form.pricing.whole_warning"));
					}

					await switchSupplierProductPricing({
						typ: ENUM_SUPPLIER_TYPE.TRAIN,
						supplierId,
						productId,
						values
					}).unwrap();
				}
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				section === ENUM_FORM_TRAIN_SECTION.GENERAL && isCreate
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
