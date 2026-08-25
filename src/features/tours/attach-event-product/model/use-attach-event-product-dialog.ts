import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
	type ENUM_SUPPLIER_TYPE_TYPE,
	useListAllProductsQuery
} from "@/entities/supplier";
import type { IEventProductLink } from "@/entities/tour";

import { FORM_ATTACH_PRODUCT_VARIANT_FIELD } from "./config";
import {
	ATTACH_PRODUCT_PICKER_SCHEMA,
	type TAttachProductPickerSchema
} from "./form.schema";
import { ENUM_FORM_ATTACH_PRODUCT } from "./types";

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
	const [selectedProductId, setSelectedProductId] = useState<string | null>(
		null
	);

	const form = useForm<TAttachProductPickerSchema>({
		resolver: zodResolver(ATTACH_PRODUCT_PICKER_SCHEMA),
		defaultValues: {
			[ENUM_FORM_ATTACH_PRODUCT.SEARCH]: "",
			[ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID]: null
		},
		mode: "onSubmit"
	});

	const search = useWatch({
		control: form.control,
		name: ENUM_FORM_ATTACH_PRODUCT.SEARCH
	});

	useEffect(() => {
		if (!open) {
			return;
		}

		form.reset({
			[ENUM_FORM_ATTACH_PRODUCT.SEARCH]: "",
			[ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID]: initialVariantId ?? null
		});
		setSelectedProductId(initialProductId ?? null);
	}, [open, initialProductId, initialVariantId, form]);

	const { data, isFetching, isError, refetch } = useListAllProductsQuery(
		{
			page: 1,
			limit: 50,
			search: search?.trim() || undefined,
			typ
		},
		{ skip: !open }
	);

	const products = data?.data ?? [];
	const selectedProduct = useMemo(
		() => products.find((item) => item.id === selectedProductId) ?? null,
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

	const handleSelectProduct = (nextProductId: string) => {
		setSelectedProductId(nextProductId);
		form.setValue(ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID, null);
	};

	const handleConfirm = async () => {
		if (!selectedProductId) {
			return;
		}

		const values = form.getValues();

		await onConfirm({
			productId: selectedProductId,
			variantId: values[ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID]
		});
	};

	return {
		form,
		products,
		selectedProductId,
		selectedProduct,
		isFetching,
		isError,
		refetch,
		variantField,
		handleSelectProduct,
		handleConfirm
	};
};
