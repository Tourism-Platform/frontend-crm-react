import type { FC } from "react";

import { SelectPicker } from "@/shared/ui";

import { CURRENCY_OPTIONS } from "@/entities/commission";

import { usePreviewCurrency } from "../../model/hooks";

export const PreviewCurrencySelect: FC = () => {
	const { currency, setCurrency } = usePreviewCurrency();

	return (
		<SelectPicker
			className="w-32"
			options={CURRENCY_OPTIONS}
			value={currency}
			onChange={setCurrency}
		/>
	);
};
