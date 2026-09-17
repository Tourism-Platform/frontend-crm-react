import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useNavigateByType } from "@/shared/hooks";

import {
	BUS_PRODUCT_EDIT_SCHEMA,
	ENUM_BUS_PRICING,
	ENUM_FORM_BUS_SECTION,
	type ENUM_FORM_BUS_SECTION_TYPE,
	ENUM_FORM_BUS_VEHICLES,
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	type TBusProductEditSchema,
	type TSupplierProduct,
	buildSupplierProductEditRoute,
	isBusWholePricingType,
	mapBusProductToEditForm,
	mapBusVehicleRowToVariantWrite,
	useCreateBusProductMutation,
	useSwitchBusProductPricingMutation,
	useUpdateBusProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryBusProductEdit = ({
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
	const { t } = useTranslation("bus_product_edit_page");
	const { navigateToType, isExpectedType } = useNavigateByType({
		expectedType: ENUM_SUPPLIER_TYPE.BUS,
		actualType: product?.typ,
		params: { supplierId, productId: product?.id ?? productId },
		resolvePath: buildSupplierProductEditRoute,
		enabled: !isCreate && Boolean(product)
	});

	const busProduct = isExpectedType
		? ((product ?? null) as IBusProduct | null)
		: null;

	const form = useForm<TBusProductEditSchema>({
		resolver: zodResolver(BUS_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapBusProductToEditForm(busProduct)
	});

	useEffect(() => {
		form.reset(mapBusProductToEditForm(busProduct));
	}, [busProduct, form]);

	const [createBusProduct, { isLoading: isCreating }] =
		useCreateBusProductMutation();
	const [updateBusProduct, { isLoading: isUpdating }] =
		useUpdateBusProductMutation();
	const [updateVariant, { isLoading: isUpdatingVariant }] =
		useUpdateVariantMutation();
	const [switchBusProductPricing, { isLoading: isSwitching }] =
		useSwitchBusProductPricingMutation();
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
					const created = await createBusProduct({
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

				await updateBusProduct({
					supplierId,
					productId,
					values,
					existing: busProduct
				}).unwrap();
			} else if (section === ENUM_FORM_BUS_SECTION.VEHICLES) {
				if (!busProduct) return;

				const vehicles =
					form.getValues()[ENUM_FORM_BUS_SECTION.VEHICLES][
						ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST
					];

				await Promise.all(
					vehicles.map((vehicle) =>
						updateVariant({
							supplierId,
							productId,
							variantId:
								vehicle[ENUM_FORM_BUS_VEHICLES.VARIANT_ID],
							typ: ENUM_SUPPLIER_TYPE.BUS,
							pricing: busProduct.pricing,
							data: mapBusVehicleRowToVariantWrite(
								vehicle,
								busProduct
							)
						}).unwrap()
					)
				);
			} else if (section === ENUM_FORM_BUS_SECTION.PRICING) {
				if (!busProduct) return;

				const values = form.getValues();
				if (
					isBusWholePricingType(values.pricing.pricing_type) &&
					busProduct.pricing !== ENUM_BUS_PRICING.WHOLE
				) {
					toast.warning(t("form.pricing.whole_warning"));
				}

				await switchBusProductPricing({
					supplierId,
					productId,
					values
				}).unwrap();
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
		form,
		createSectionSubmit,
		isLoading,
		isExpectedType,
		product: busProduct
	};
};
