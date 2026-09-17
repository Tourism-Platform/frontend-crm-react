import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { useNavigateByType } from "@/shared/hooks";

import {
	ACTIVITY_PRODUCT_EDIT_SCHEMA,
	ENUM_FORM_ACTIVITY_SECTION,
	type ENUM_FORM_ACTIVITY_SECTION_TYPE,
	ENUM_FORM_ACTIVITY_VARIANTS,
	ENUM_SUPPLIER_TYPE,
	type IActivityProduct,
	type TActivityProductEditSchema,
	type TSupplierProduct,
	buildSupplierProductEditRoute,
	mapActivityOfferingRowToVariantWrite,
	mapActivityProductToEditForm,
	useCreateActivityProductMutation,
	useUpdateActivityProductMutation,
	useUpdateVariantMutation
} from "@/entities/supplier";

export const useLibraryActivityProductEdit = ({
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
	const { t, i18n } = useTranslation("activity_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const { navigateToType, isExpectedType } = useNavigateByType({
		expectedType: ENUM_SUPPLIER_TYPE.ACTIVITY,
		actualType: product?.typ,
		params: { supplierId, productId: product?.id ?? productId },
		resolvePath: buildSupplierProductEditRoute,
		enabled: !isCreate && Boolean(product)
	});

	const activityProduct = isExpectedType
		? ((product ?? null) as IActivityProduct | null)
		: null;

	const form = useForm<TActivityProductEditSchema>({
		resolver: zodResolver(ACTIVITY_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: mapActivityProductToEditForm(activityProduct)
	});

	useEffect(() => {
		form.reset(mapActivityProductToEditForm(activityProduct));
	}, [activityProduct, form]);

	const [createActivityProduct, { isLoading: isCreating }] =
		useCreateActivityProductMutation();
	const [updateActivityProduct, { isLoading: isUpdating }] =
		useUpdateActivityProductMutation();
	const [updateVariant, { isLoading: isUpdatingVariant }] =
		useUpdateVariantMutation();
	const isLoading = isCreating || isUpdating || isUpdatingVariant;

	const createSectionSubmit = async (
		section?: ENUM_FORM_ACTIVITY_SECTION_TYPE
	) => {
		if (!section) return;
		if (section !== ENUM_FORM_ACTIVITY_SECTION.GENERAL && isCreate) {
			return;
		}

		const isValid = await form.trigger(section);
		if (!isValid) return;

		try {
			if (section === ENUM_FORM_ACTIVITY_SECTION.GENERAL) {
				const values =
					form.getValues()[ENUM_FORM_ACTIVITY_SECTION.GENERAL];

				if (isCreate) {
					const created = await createActivityProduct({
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

				await updateActivityProduct({
					supplierId,
					productId,
					values,
					language
				}).unwrap();
			} else if (section === ENUM_FORM_ACTIVITY_SECTION.VARIANTS) {
				if (!activityProduct) return;

				const rows =
					form.getValues()[ENUM_FORM_ACTIVITY_SECTION.VARIANTS][
						ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST
					];

				await Promise.all(
					rows.map((row) =>
						updateVariant({
							supplierId,
							productId,
							variantId:
								row[ENUM_FORM_ACTIVITY_VARIANTS.VARIANT_ID],
							typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
							data: mapActivityOfferingRowToVariantWrite(
								row,
								activityProduct
							)
						}).unwrap()
					)
				);
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(
				section === ENUM_FORM_ACTIVITY_SECTION.GENERAL && isCreate
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
		product: activityProduct
	};
};
