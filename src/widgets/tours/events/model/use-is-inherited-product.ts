import { type UseFormReturn, useWatch } from "react-hook-form";

import { ENUM_FORM_EVENT_PRODUCT } from "@/entities/tour";

type TWithEventProduct = {
	[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID]?: string;
	[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]?: boolean;
};

export const useIsInheritedProduct = <T extends TWithEventProduct>(
	form: UseFormReturn<T>
) => {
	const productId = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID as never
	});

	return Boolean(productId);
};

export const useHasProductOverride = <T extends TWithEventProduct>(
	form: UseFormReturn<T>
) => {
	const hasOverride = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE as never
	});

	return Boolean(hasOverride);
};
