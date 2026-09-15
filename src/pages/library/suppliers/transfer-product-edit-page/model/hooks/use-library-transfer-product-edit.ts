import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useNavigateByType } from "@/shared/hooks";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	type ENUM_FORM_TRANSFER_SECTION_TYPE,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRANSFER_PRICING,
	type ITransferProduct,
	TRANSFER_PRODUCT_EDIT_SCHEMA,
	type TSupplierProduct,
	type TTransferProductEditSchema,
	buildSupplierProductEditRoute,
	isTransferWholePricingType,
	mapTransferCarRowToVariantWrite,
	mapTransferEditFormToPricingSwitch,
	mapTransferProductToEditForm,
	useCreateTransferProductMutation,
	useSwitchTransferProductPricingMutation,
	useUpdateTransferProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryTransferProductEdit = ({
	supplierId,
	productId,
	isCreate,
	product
}: {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: TSupplierProduct | null;
}) => {
	const { t } = useTranslation("transfer_product_edit_page");
	const { navigateToType, isExpectedType } = useNavigateByType({
		expectedType: ENUM_SUPPLIER_TYPE.TRANSFER,
		actualType: product?.typ,
		params: { supplierId, productId: product?.id ?? productId },
		resolvePath: buildSupplierProductEditRoute,
		enabled: !isCreate && Boolean(product)
	});

	const transferProduct = isExpectedType
		? ((product ?? null) as ITransferProduct | null)
		: null;

	const form = useForm<TTransferProductEditSchema>({
		resolver: zodResolver(TRANSFER_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapTransferProductToEditForm(transferProduct)
	});

	useEffect(() => {
		form.reset(mapTransferProductToEditForm(transferProduct));
	}, [transferProduct, form]);

	const [createTransferProduct, { isLoading: isCreating }] =
		useCreateTransferProductMutation();
	const [updateTransferProduct, { isLoading: isUpdating }] =
		useUpdateTransferProductMutation();
	const [updateVariant, { isLoading: isUpdatingVariant }] =
		useUpdateVariantMutation();
	const [switchTransferProductPricing, { isLoading: isSwitching }] =
		useSwitchTransferProductPricingMutation();
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
					const created = await createTransferProduct({
						supplierId,
						values
					}).unwrap();
					toast.success(t("form.toasts.create.success"));
					navigateToType(
						created.typ,
						{ replace: true },
						{ productId: created.id }
					);
					return;
				}

				await updateTransferProduct({
					supplierId,
					productId,
					values,
					existing: transferProduct
				}).unwrap();
			} else if (section === ENUM_FORM_TRANSFER_SECTION.CARS) {
				if (!transferProduct) return;

				const cars =
					form.getValues()[ENUM_FORM_TRANSFER_SECTION.CARS][
						ENUM_FORM_TRANSFER_CARS.CARS_LIST
					];

				await Promise.all(
					cars.map((car) =>
						updateVariant({
							supplierId,
							productId,
							variantId: car[ENUM_FORM_TRANSFER_CARS.VARIANT_ID],
							typ: ENUM_SUPPLIER_TYPE.TRANSFER,
							pricing: transferProduct.pricing,
							data: mapTransferCarRowToVariantWrite(
								car,
								transferProduct
							)
						}).unwrap()
					)
				);
			} else if (section === ENUM_FORM_TRANSFER_SECTION.PRICING) {
				if (!transferProduct) return;

				const values = form.getValues();
				if (
					isTransferWholePricingType(values.pricing.pricing_type) &&
					transferProduct.pricing !== ENUM_TRANSFER_PRICING.WHOLE
				) {
					toast.warning(t("form.pricing.whole_warning"));
				}

				await switchTransferProductPricing({
					supplierId,
					productId,
					body: mapTransferEditFormToPricingSwitch(values)
				}).unwrap();
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
		form,
		createSectionSubmit,
		isLoading,
		isExpectedType,
		product: transferProduct
	};
};
