import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
	type ENUM_SUPPLIER_TYPE_TYPE,
	useSupplierProductSearchOptions
} from "@/entities/supplier";
import type { IEventProductLink } from "@/entities/tour";

import { FORM_ATTACH_PRODUCT_VARIANT_FIELD } from "./config";
import { ATTACH_PRODUCT_PICKER_SCHEMA } from "./form.schema";
import {
	ENUM_FORM_ATTACH_PRODUCT,
	type TAttachProductPickerSchema
} from "./types";

interface IUseAttachEventProductDialogParams {
	open: boolean;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	initialProductId?: string;
	initialVariantId?: string | null;
	onConfirm: (link: IEventProductLink) => void | Promise<void>;
}

export const useAttachEventProductDialog = ({
	open,
	typ,
	initialProductId,
	initialVariantId,
	onConfirm
}: IUseAttachEventProductDialogParams) => {
	const products = useSupplierProductSearchOptions({
		typ,
		enabled: open
	});
	const previousProductIdRef = useRef<string | undefined>(undefined);

	const form = useForm<TAttachProductPickerSchema>({
		resolver: zodResolver(ATTACH_PRODUCT_PICKER_SCHEMA),
		defaultValues: {
			[ENUM_FORM_ATTACH_PRODUCT.PRODUCT_ID]: undefined,
			[ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID]: null
		},
		mode: "onSubmit"
	});

	const selectedProductId = useWatch({
		control: form.control,
		name: ENUM_FORM_ATTACH_PRODUCT.PRODUCT_ID
	});

	useEffect(() => {
		if (!open) {
			previousProductIdRef.current = undefined;
			return;
		}

		form.reset({
			[ENUM_FORM_ATTACH_PRODUCT.PRODUCT_ID]: initialProductId,
			[ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID]: initialVariantId ?? null
		});
		previousProductIdRef.current = initialProductId;
	}, [open, initialProductId, initialVariantId, form]);

	useEffect(() => {
		if (!open || !selectedProductId) {
			return;
		}

		if (
			previousProductIdRef.current &&
			previousProductIdRef.current !== selectedProductId
		) {
			form.setValue(ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID, null);
		}

		previousProductIdRef.current = selectedProductId;
	}, [open, selectedProductId, form]);

	const selectedProduct = useMemo(
		() =>
			selectedProductId
				? (products.getProductById(selectedProductId) ?? null)
				: null,
		[products, selectedProductId]
	);

	const variantField = useMemo(() => {
		const options =
			selectedProduct?.variants.map((variant) => ({
				label: variant.name,
				value: variant.id
			})) ?? [];

		return FORM_ATTACH_PRODUCT_VARIANT_FIELD(options);
	}, [selectedProduct]);

	async function onSubmit(values: TAttachProductPickerSchema) {
		const productId = values[ENUM_FORM_ATTACH_PRODUCT.PRODUCT_ID];
		const variantId = values[ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID];

		await onConfirm({
			productId,
			scope: variantId ? { typ: "only", ids: [variantId] } : undefined
		});
	}

	return {
		form,
		products,
		selectedProduct,
		variantField,
		onSubmit
	};
};
