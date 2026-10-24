import { type FC } from "react";

import { useInheritedProductSeasonRates } from "../../model";

import { ProductSeasonRates } from "./product-season-rates";

/** Сезонные цены продукта, к которому привязано событие (данные берёт сам) */
export const InheritedProductSeasonRates: FC = () => {
	const { rows, isLoading } = useInheritedProductSeasonRates();

	if (isLoading || !rows.length) {
		return null;
	}

	return <ProductSeasonRates rows={rows} />;
};
