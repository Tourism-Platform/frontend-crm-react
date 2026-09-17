import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	type ENUM_FORM_TRANSFER_SECTION_TYPE,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRANSFER_PRICING,
	type ITransferProduct,
	type TSupplierProduct,
	type TTransferProductEditSchema,
	isTransferWholePricingType,
	useCreateSupplierProductMutation,
	useSwitchSupplierProductPricingMutation,
	useUpdateSupplierProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryTransferProductEdit = ({
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
	form: UseFormReturn<TTransferProductEditSchema>;
	product?: ITransferProduct;
	onCreated: (productId: string, typ: TSupplierProduct["typ"]) => void;
}) => {
	const { t } = useTranslation("transfer_product_edit_page");

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
		section?: ENUM_FORM_TRANSFER_SECTION_TYPE
	) => {
		if (!section) return;
		if (section !== ENUM_FORM_TRANSFER_SECTION.GENERAL && isCreate) {
			return;
		}

		const isValid = await form.trigger(section);
		if (!isValid) return;

		try {
			if (section === ENUM_FORM_TRANSFER_SECTION.GENERAL) {
				const values =
					form.getValues()[ENUM_FORM_TRANSFER_SECTION.GENERAL];

				if (isCreate) {
					const created = await createSupplierProduct({
						typ: ENUM_SUPPLIER_TYPE.TRANSFER,
						supplierId,
						values
					}).unwrap();
					toast.success(t("form.toasts.create.success"));
					onCreated(created.id, created.typ);
					return;
				}

				await updateSupplierProduct({
					typ: ENUM_SUPPLIER_TYPE.TRANSFER,
					supplierId,
					productId,
					values,
					existing: product
				}).unwrap();
			} else {
				if (!product) return;

				if (section === ENUM_FORM_TRANSFER_SECTION.CARS) {
					const cars =
						form.getValues()[ENUM_FORM_TRANSFER_SECTION.CARS][
							ENUM_FORM_TRANSFER_CARS.CARS_LIST
						];

					await Promise.all(
						cars.map((car) =>
							updateVariant({
								typ: ENUM_SUPPLIER_TYPE.TRANSFER,
								supplierId,
								productId,
								variantId:
									car[ENUM_FORM_TRANSFER_CARS.VARIANT_ID],
								row: car,
								existing: product
							}).unwrap()
						)
					);
				} else if (section === ENUM_FORM_TRANSFER_SECTION.PRICING) {
					const values = form.getValues();
					if (
						isTransferWholePricingType(
							values.pricing.pricing_type
						) &&
						product.pricing !== ENUM_TRANSFER_PRICING.WHOLE
					) {
						toast.warning(t("form.pricing.whole_warning"));
					}

					await switchSupplierProductPricing({
						typ: ENUM_SUPPLIER_TYPE.TRANSFER,
						supplierId,
						productId,
						values
					}).unwrap();
				}
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				section === ENUM_FORM_TRANSFER_SECTION.GENERAL && isCreate
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
