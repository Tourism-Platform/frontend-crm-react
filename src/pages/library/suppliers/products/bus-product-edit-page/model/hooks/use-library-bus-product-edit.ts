import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	ENUM_BUS_PRICING,
	ENUM_FORM_BUS_SECTION,
	type ENUM_FORM_BUS_SECTION_TYPE,
	ENUM_FORM_BUS_VEHICLES,
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	type TBusProductEditSchema,
	type TSupplierProduct,
	isBusWholePricingType,
	useCreateSupplierProductMutation,
	useSwitchSupplierProductPricingMutation,
	useUpdateSupplierProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryBusProductEdit = ({
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
	form: UseFormReturn<TBusProductEditSchema>;
	product?: IBusProduct;
	onCreated: (productId: string, typ: TSupplierProduct["typ"]) => void;
}) => {
	const { t } = useTranslation("bus_product_edit_page");

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
		section?: ENUM_FORM_BUS_SECTION_TYPE
	) => {
		if (!section) return;
		if (section !== ENUM_FORM_BUS_SECTION.GENERAL && isCreate) {
			return;
		}

		const isValid = await form.trigger(section);
		if (!isValid) return;

		try {
			if (section === ENUM_FORM_BUS_SECTION.GENERAL) {
				const values = form.getValues()[ENUM_FORM_BUS_SECTION.GENERAL];

				if (isCreate) {
					const created = await createSupplierProduct({
						typ: ENUM_SUPPLIER_TYPE.BUS,
						supplierId,
						values
					}).unwrap();
					toast.success(t("form.toasts.create.success"));
					onCreated(created.id, created.typ);
					return;
				}

				await updateSupplierProduct({
					typ: ENUM_SUPPLIER_TYPE.BUS,
					supplierId,
					productId,
					values,
					existing: product
				}).unwrap();
			} else {
				if (!product) return;

				if (section === ENUM_FORM_BUS_SECTION.VEHICLES) {
					const vehicles =
						form.getValues()[ENUM_FORM_BUS_SECTION.VEHICLES][
							ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST
						];

					await Promise.all(
						vehicles.map((vehicle) =>
							updateVariant({
								typ: ENUM_SUPPLIER_TYPE.BUS,
								supplierId,
								productId,
								variantId:
									vehicle[ENUM_FORM_BUS_VEHICLES.VARIANT_ID],
								row: vehicle,
								existing: product
							}).unwrap()
						)
					);
				} else if (section === ENUM_FORM_BUS_SECTION.PRICING) {
					const values = form.getValues();
					if (
						isBusWholePricingType(values.pricing.pricing_type) &&
						product.pricing !== ENUM_BUS_PRICING.WHOLE
					) {
						toast.warning(t("form.pricing.whole_warning"));
					}

					await switchSupplierProductPricing({
						typ: ENUM_SUPPLIER_TYPE.BUS,
						supplierId,
						productId,
						values
					}).unwrap();
				}
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				section === ENUM_FORM_BUS_SECTION.GENERAL && isCreate
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
