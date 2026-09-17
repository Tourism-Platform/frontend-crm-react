import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	type ENUM_FORM_TRANSFER_SECTION_TYPE,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRANSFER_PRICING,
	ENUM_TRANSFER_PRODUCT_EXPENSE_TYP,
	ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_FIELD,
	type ITransferProduct,
	type TSupplierProduct,
	type TTransferProductEditSchema,
	isTransferWholePricingType,
	mapTransferCarRowToVariantWrite,
	mapTransferProductWithPricingFleet,
	resolveTransferTargetPricing,
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
					const pricing = values[ENUM_FORM_TRANSFER_SECTION.PRICING];
					if (
						isTransferWholePricingType(pricing.pricing_type) &&
						product.pricing !== ENUM_TRANSFER_PRICING.WHOLE
					) {
						toast.warning(t("form.pricing.whole_warning"));
					}

					const targetPricing = resolveTransferTargetPricing(values);

					if (targetPricing !== product.pricing) {
						await switchSupplierProductPricing({
							typ: ENUM_SUPPLIER_TYPE.TRANSFER,
							supplierId,
							productId,
							values
						}).unwrap();
						return;
					}

					if (
						targetPricing === ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY
					) {
						const productWithFleet =
							mapTransferProductWithPricingFleet(
								product,
								pricing
							);
						const general =
							values[ENUM_FORM_TRANSFER_SECTION.GENERAL];

						await updateSupplierProduct({
							typ: ENUM_SUPPLIER_TYPE.TRANSFER,
							supplierId,
							productId,
							values: general,
							existing: productWithFleet
						}).unwrap();

						const cars =
							values[ENUM_FORM_TRANSFER_SECTION.CARS][
								ENUM_FORM_TRANSFER_CARS.CARS_LIST
							];
						const expenses = pricing.expenses;
						const categoryCars =
							expenses?.typ ===
							ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY
								? expenses[
										ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD
											.CARS
									]
								: [];
						const addMargin =
							pricing[
								ENUM_TRANSFER_PRODUCT_PRICING_FIELD
									.ADD_MARGIN_SEPARATELY
							];

						await Promise.all(
							cars.map((car, index) =>
								updateVariant({
									typ: ENUM_SUPPLIER_TYPE.TRANSFER,
									supplierId,
									productId,
									variantId:
										car[ENUM_FORM_TRANSFER_CARS.VARIANT_ID],
									row: car,
									existing: productWithFleet,
									variantWrite:
										mapTransferCarRowToVariantWrite(
											car,
											productWithFleet,
											{
												categoryRows:
													categoryCars[index]?.[
														ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD
															.CATEGORIES
													] ?? [],
												addMarginSeparately: addMargin
											}
										)
								}).unwrap()
							)
						);
						return;
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
