import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { useNavigateByType } from "@/shared/hooks";

import {
	ENUM_FLIGHT_PRICING,
	ENUM_FORM_FLIGHT_FARES,
	ENUM_FORM_FLIGHT_SECTION,
	type ENUM_FORM_FLIGHT_SECTION_TYPE,
	ENUM_SUPPLIER_TYPE,
	FLIGHT_PRODUCT_EDIT_SCHEMA,
	type IFlightProduct,
	type TFlightProductEditSchema,
	type TSupplierProduct,
	buildSupplierProductEditRoute,
	isFlightWholePricingType,
	mapFareRowToVariantWrite,
	mapFlightProductToEditForm,
	useCreateFlightProductMutation,
	useSwitchFlightProductPricingMutation,
	useUpdateFlightProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryFlightProductEdit = ({
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
	const { t, i18n } = useTranslation("flight_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const { navigateToType, isExpectedType } = useNavigateByType({
		expectedType: ENUM_SUPPLIER_TYPE.FLIGHT,
		actualType: product?.typ,
		params: { supplierId, productId: product?.id ?? productId },
		resolvePath: buildSupplierProductEditRoute,
		enabled: !isCreate && Boolean(product)
	});

	const flightProduct = isExpectedType
		? ((product ?? null) as IFlightProduct | null)
		: null;

	const form = useForm<TFlightProductEditSchema>({
		resolver: zodResolver(FLIGHT_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapFlightProductToEditForm(flightProduct)
	});

	useEffect(() => {
		form.reset(mapFlightProductToEditForm(flightProduct));
	}, [flightProduct, form]);

	const [createFlightProduct, { isLoading: isCreating }] =
		useCreateFlightProductMutation();
	const [updateFlightProduct, { isLoading: isUpdating }] =
		useUpdateFlightProductMutation();
	const [updateVariant, { isLoading: isUpdatingVariant }] =
		useUpdateVariantMutation();
	const [switchFlightProductPricing, { isLoading: isSwitching }] =
		useSwitchFlightProductPricingMutation();
	const isLoading =
		isCreating || isUpdating || isUpdatingVariant || isSwitching;

	const createSectionSubmit = async (
		section?: ENUM_FORM_FLIGHT_SECTION_TYPE
	) => {
		if (!section) return;
		if (section !== ENUM_FORM_FLIGHT_SECTION.GENERAL && isCreate) {
			return;
		}

		const isValid = await form.trigger(section);
		if (!isValid) return;

		try {
			if (section === ENUM_FORM_FLIGHT_SECTION.GENERAL) {
				const values =
					form.getValues()[ENUM_FORM_FLIGHT_SECTION.GENERAL];

				if (isCreate) {
					const created = await createFlightProduct({
						supplierId,
						values,
						language
					}).unwrap();
					toast.success(t("form.toasts.create.success"));
					navigateToType(
						created.typ,
						{ replace: true },
						{ productId: created.id }
					);
					return;
				}

				await updateFlightProduct({
					supplierId,
					productId,
					values,
					language,
					existing: flightProduct
				}).unwrap();
			} else if (section === ENUM_FORM_FLIGHT_SECTION.FARES) {
				if (!flightProduct) return;

				const rows =
					form.getValues()[ENUM_FORM_FLIGHT_SECTION.FARES][
						ENUM_FORM_FLIGHT_FARES.FARES_LIST
					];

				await Promise.all(
					rows.map((row) =>
						updateVariant({
							supplierId,
							productId,
							variantId: row[ENUM_FORM_FLIGHT_FARES.VARIANT_ID],
							typ: ENUM_SUPPLIER_TYPE.FLIGHT,
							pricing: flightProduct.pricing,
							data: mapFareRowToVariantWrite(row, flightProduct)
						}).unwrap()
					)
				);
			} else if (section === ENUM_FORM_FLIGHT_SECTION.PRICING) {
				if (!flightProduct) return;

				const values = form.getValues();
				if (
					isFlightWholePricingType(values.pricing.pricing_type) &&
					flightProduct.pricing !== ENUM_FLIGHT_PRICING.WHOLE
				) {
					toast.warning(t("form.pricing.whole_warning"));
				}

				await switchFlightProductPricing({
					supplierId,
					productId,
					values
				}).unwrap();
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				section === ENUM_FORM_FLIGHT_SECTION.GENERAL && isCreate
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
		product: flightProduct
	};
};
