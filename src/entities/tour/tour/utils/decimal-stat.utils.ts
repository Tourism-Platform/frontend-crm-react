import Decimal from "decimal.js";

import { parseDecimalSafe } from "@/shared/utils";

export const toDecimal = (value: string | number): Decimal =>
	parseDecimalSafe(value);

export const subtractDecimalMaxZero = (
	minuend: string,
	subtrahend: string
): string => {
	const result = toDecimal(minuend).minus(toDecimal(subtrahend));
	return result.isNegative() ? "0" : result.toString();
};
