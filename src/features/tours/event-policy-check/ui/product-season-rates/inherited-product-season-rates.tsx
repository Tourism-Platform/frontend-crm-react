import { type FC } from "react";

import { useInheritedProductSeasonRates } from "../../model";

import { ProductSeasonRates } from "./product-season-rates";

/** Сезонные цены продукта, к которому привязано событие (данные берёт сам) */
export const InheritedProductSeasonRates: FC = () => {
	const { rates, isLoading } = useInheritedProductSeasonRates();

	if (isLoading || !rates.length) {
		return null;
	}

	return <ProductSeasonRates rates={rates} />;
};
