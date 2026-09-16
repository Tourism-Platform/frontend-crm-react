import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { useNavigateByType } from "@/shared/hooks";

import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_FORM_HOTEL_SECTION,
	type ENUM_FORM_HOTEL_SECTION_TYPE,
	ENUM_HOTEL_PRICING,
	ENUM_SUPPLIER_TYPE,
	HOTEL_PRODUCT_EDIT_SCHEMA,
	type IHotelProduct,
	type THotelProductEditSchema,
	type TSupplierProduct,
	buildSupplierProductEditRoute,
	isHotelWholePricingType,
	mapHotelEditFormToPricingSwitch,
	mapHotelProductToEditForm,
	mapHotelRoomRowToVariantWrite,
	useCreateHotelProductMutation,
	useSwitchHotelProductPricingMutation,
	useUpdateHotelProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryHotelProductEdit = ({
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
	const { t, i18n } = useTranslation("hotel_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const { navigateToType, isExpectedType } = useNavigateByType({
		expectedType: ENUM_SUPPLIER_TYPE.HOTEL,
		actualType: product?.typ,
		params: { supplierId, productId: product?.id ?? productId },
		resolvePath: buildSupplierProductEditRoute,
		enabled: !isCreate && Boolean(product)
	});

	const hotelProduct = isExpectedType
		? ((product ?? null) as IHotelProduct | null)
		: null;

	const form = useForm<THotelProductEditSchema>({
		resolver: zodResolver(HOTEL_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapHotelProductToEditForm(hotelProduct)
	});

	useEffect(() => {
		form.reset(mapHotelProductToEditForm(hotelProduct));
	}, [hotelProduct, form]);

	const [createHotelProduct, { isLoading: isCreating }] =
		useCreateHotelProductMutation();
	const [updateHotelProduct, { isLoading: isUpdating }] =
		useUpdateHotelProductMutation();
	const [updateVariant, { isLoading: isUpdatingVariant }] =
		useUpdateVariantMutation();
	const [switchHotelProductPricing, { isLoading: isSwitching }] =
		useSwitchHotelProductPricingMutation();
	const isLoading =
		isCreating || isUpdating || isUpdatingVariant || isSwitching;

	const createSectionSubmit = async (
		section?: ENUM_FORM_HOTEL_SECTION_TYPE
	) => {
		if (!section) return;
		if (section !== ENUM_FORM_HOTEL_SECTION.GENERAL && isCreate) {
			return;
		}

		const isValid = await form.trigger(section);
		if (!isValid) return;

		try {
			if (section === ENUM_FORM_HOTEL_SECTION.GENERAL) {
				const values =
					form.getValues()[ENUM_FORM_HOTEL_SECTION.GENERAL];

				if (isCreate) {
					const created = await createHotelProduct({
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

				await updateHotelProduct({
					supplierId,
					productId,
					values,
					language,
					existing: hotelProduct
				}).unwrap();
			} else if (section === ENUM_FORM_HOTEL_SECTION.ROOMS) {
				if (!hotelProduct) return;

				const rooms =
					form.getValues()[ENUM_FORM_HOTEL_SECTION.ROOMS][
						ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST
					];

				await Promise.all(
					rooms.map((room) =>
						updateVariant({
							supplierId,
							productId,
							variantId:
								room[ENUM_FORM_HOTEL_PRODUCT_ROOMS.VARIANT_ID],
							typ: ENUM_SUPPLIER_TYPE.HOTEL,
							pricing: hotelProduct.pricing,
							data: mapHotelRoomRowToVariantWrite(
								room,
								hotelProduct
							)
						}).unwrap()
					)
				);
			} else if (section === ENUM_FORM_HOTEL_SECTION.PRICING) {
				if (!hotelProduct) return;

				const values = form.getValues();
				if (
					isHotelWholePricingType(values.pricing.pricing_type) &&
					hotelProduct.pricing !== ENUM_HOTEL_PRICING.WHOLE
				) {
					toast.warning(t("form.pricing.whole_warning"));
				}

				await switchHotelProductPricing({
					supplierId,
					productId,
					body: mapHotelEditFormToPricingSwitch(values, hotelProduct)
				}).unwrap();
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				section === ENUM_FORM_HOTEL_SECTION.GENERAL && isCreate
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
		product: hotelProduct
	};
};
