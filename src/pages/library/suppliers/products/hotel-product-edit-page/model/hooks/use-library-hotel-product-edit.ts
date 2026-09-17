import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_FORM_HOTEL_SECTION,
	type ENUM_FORM_HOTEL_SECTION_TYPE,
	ENUM_HOTEL_PRICING,
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	type THotelProductEditSchema,
	type TSupplierProduct,
	isHotelWholePricingType,
	useCreateSupplierProductMutation,
	useSwitchSupplierProductPricingMutation,
	useUpdateSupplierProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryHotelProductEdit = ({
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
	form: UseFormReturn<THotelProductEditSchema>;
	product?: IHotelProduct;
	onCreated: (productId: string, typ: TSupplierProduct["typ"]) => void;
}) => {
	const { t, i18n } = useTranslation("hotel_product_edit_page");
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
					const created = await createSupplierProduct({
						typ: ENUM_SUPPLIER_TYPE.HOTEL,
						supplierId,
						values,
						language
					}).unwrap();
					toast.success(t("form.toasts.create.success"));
					onCreated(created.id, created.typ);
					return;
				}

				await updateSupplierProduct({
					typ: ENUM_SUPPLIER_TYPE.HOTEL,
					supplierId,
					productId,
					values,
					language,
					existing: product
				}).unwrap();
			} else {
				if (!product) return;

				if (section === ENUM_FORM_HOTEL_SECTION.ROOMS) {
					const rooms =
						form.getValues()[ENUM_FORM_HOTEL_SECTION.ROOMS][
							ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST
						];

					await Promise.all(
						rooms.map((room) =>
							updateVariant({
								typ: ENUM_SUPPLIER_TYPE.HOTEL,
								supplierId,
								productId,
								variantId:
									room[
										ENUM_FORM_HOTEL_PRODUCT_ROOMS.VARIANT_ID
									],
								row: room,
								existing: product
							}).unwrap()
						)
					);
				} else if (section === ENUM_FORM_HOTEL_SECTION.PRICING) {
					const values = form.getValues();
					if (
						isHotelWholePricingType(values.pricing.pricing_type) &&
						product.pricing !== ENUM_HOTEL_PRICING.WHOLE
					) {
						toast.warning(t("form.pricing.whole_warning"));
					}

					await switchSupplierProductPricing({
						typ: ENUM_SUPPLIER_TYPE.HOTEL,
						supplierId,
						productId,
						values,
						existing: product
					}).unwrap();
				}
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
		createSectionSubmit,
		isLoading
	};
};
