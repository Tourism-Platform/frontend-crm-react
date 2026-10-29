import type { Currency } from "@/shared/api";

import type { ITourSummaryRange } from "@/entities/tour/tour/types/tour-review.interface";

export const ENUM_PRICE_MATRIX_TYPE = {
	PER_PAX: "per_pax",
	PER_RANGE: "per_range"
} as const;

export type ENUM_PRICE_MATRIX_TYPE_TYPE =
	(typeof ENUM_PRICE_MATRIX_TYPE)[keyof typeof ENUM_PRICE_MATRIX_TYPE];

export interface IPriceMatrixPaxRange {
	from: number;
	to: number;
}

export interface IPriceMatrixRow {
	paxFrom: number;
	paxTo: number;
	/** Численность, задающая цену диапазона; для per_pax совпадает с pax */
	bindingPax: number;
	cost: ITourSummaryRange;
	profit: ITourSummaryRange;
	revenue: ITourSummaryRange;
	perPerson: ITourSummaryRange;
}

export interface IPriceMatrix {
	type: ENUM_PRICE_MATRIX_TYPE_TYPE;
	currency: Currency;
	rows: IPriceMatrixRow[];
}

export interface IPriceMatrixArgs {
	tourId: string;
	optionId: string;
	currency?: Currency;
	paxFrom?: number | null;
	paxTo?: number | null;
	/** Если заданы, матрица режется по диапазонам, а paxFrom/paxTo игнорируются */
	brackets?: IPriceMatrixPaxRange[];
	date?: string | null;
	asOf?: string | null;
}
