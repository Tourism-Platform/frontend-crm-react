import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { useNavigateByType } from "@/shared/hooks";

import {
	ENUM_FORM_TRAIN_FARES,
	ENUM_FORM_TRAIN_SECTION,
	type ENUM_FORM_TRAIN_SECTION_TYPE,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRAIN_PRICING,
	type ITrainProduct,
	TRAIN_PRODUCT_EDIT_SCHEMA,
	type TSupplierProduct,
	type TTrainProductEditSchema,
	buildSupplierProductEditRoute,
	isTrainWholePricingType,
	mapFareRowToVariantWrite,
	mapTrainEditFormToPricingSwitch,
	mapTrainProductToEditForm,
	useCreateTrainProductMutation,
	useSwitchTrainProductPricingMutation,
	useUpdateTrainProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryTrainProductEdit = ({
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
	const { t, i18n } = useTranslation("train_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const { navigateToType, isExpectedType } = useNavigateByType({
		expectedType: ENUM_SUPPLIER_TYPE.TRAIN,
		actualType: product?.typ,
		params: { supplierId, productId: product?.id ?? productId },
		resolvePath: buildSupplierProductEditRoute,
		enabled: !isCreate && Boolean(product)
	});

	const trainProduct = isExpectedType
		? ((product ?? null) as ITrainProduct | null)
		: null;

	const form = useForm<TTrainProductEditSchema>({
		resolver: zodResolver(TRAIN_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapTrainProductToEditForm(trainProduct)
	});

	useEffect(() => {
		form.reset(mapTrainProductToEditForm(trainProduct));
	}, [trainProduct, form]);

	const [createTrainProduct, { isLoading: isCreating }] =
		useCreateTrainProductMutation();
	const [updateTrainProduct, { isLoading: isUpdating }] =
		useUpdateTrainProductMutation();
	const [updateVariant, { isLoading: isUpdatingVariant }] =
		useUpdateVariantMutation();
	const [switchTrainProductPricing, { isLoading: isSwitching }] =
		useSwitchTrainProductPricingMutation();
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
					const created = await createTrainProduct({
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

				await updateTrainProduct({
					supplierId,
					productId,
					values,
					language,
					existing: trainProduct
				}).unwrap();
			} else if (section === ENUM_FORM_TRAIN_SECTION.FARES) {
				if (!trainProduct) return;

				const rows =
					form.getValues()[ENUM_FORM_TRAIN_SECTION.FARES][
						ENUM_FORM_TRAIN_FARES.FARES_LIST
					];

				await Promise.all(
					rows.map((row) =>
						updateVariant({
							supplierId,
							productId,
							variantId: row[ENUM_FORM_TRAIN_FARES.VARIANT_ID],
							typ: ENUM_SUPPLIER_TYPE.TRAIN,
							pricing: trainProduct.pricing,
							data: mapFareRowToVariantWrite(row, trainProduct)
						}).unwrap()
					)
				);
			} else if (section === ENUM_FORM_TRAIN_SECTION.PRICING) {
				if (!trainProduct) return;

				const values = form.getValues();
				if (
					isTrainWholePricingType(values.pricing.pricing_type) &&
					trainProduct.pricing !== ENUM_TRAIN_PRICING.WHOLE
				) {
					toast.warning(t("form.pricing.whole_warning"));
				}

				await switchTrainProductPricing({
					supplierId,
					productId,
					body: mapTrainEditFormToPricingSwitch(values)
				}).unwrap();
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
		form,
		createSectionSubmit,
		isLoading,
		isExpectedType,
		product: trainProduct
	};
};
