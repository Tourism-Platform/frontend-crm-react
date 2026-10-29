import {
	ENUM_PRICE_MATRIX_TYPE,
	type IPriceMatrix,
	type IPriceMatrixArgs,
	type IPriceMatrixRow,
	type TGetPriceMatrixBackendQuery,
	type TGetPriceMatrixBackendResponse,
	type TPriceMatrixBracketBackend,
	type TPriceMatrixRowBackend
} from "../types";

import { mapMinMaxCostToRange } from "./pricing-review.converters";

const mapPriceMatrixRowToFrontend = (
	row: TPriceMatrixRowBackend
): IPriceMatrixRow => ({
	paxFrom: row.pax,
	paxTo: row.pax,
	bindingPax: row.pax,
	cost: mapMinMaxCostToRange(row.cost),
	profit: mapMinMaxCostToRange(row.profit),
	revenue: mapMinMaxCostToRange(row.revenue),
	perPerson: mapMinMaxCostToRange(row.per_person)
});

const mapPriceMatrixBracketToFrontend = (
	bracket: TPriceMatrixBracketBackend
): IPriceMatrixRow => ({
	paxFrom: bracket.pax_from,
	paxTo: bracket.pax_to,
	bindingPax: bracket.binding_pax,
	cost: mapMinMaxCostToRange(bracket.cost),
	profit: mapMinMaxCostToRange(bracket.profit),
	revenue: mapMinMaxCostToRange(bracket.revenue),
	perPerson: mapMinMaxCostToRange(bracket.per_person)
});

export const mapPriceMatrixToFrontend = (
	backend: TGetPriceMatrixBackendResponse
): IPriceMatrix =>
	backend.typ === "per_range"
		? {
				type: ENUM_PRICE_MATRIX_TYPE.PER_RANGE,
				currency: backend.currency,
				rows: backend.brackets.map(mapPriceMatrixBracketToFrontend)
			}
		: {
				type: ENUM_PRICE_MATRIX_TYPE.PER_PAX,
				currency: backend.currency,
				rows: backend.rows.map(mapPriceMatrixRowToFrontend)
			};

export const mapPriceMatrixQueryToBackend = (
	args: IPriceMatrixArgs
): TGetPriceMatrixBackendQuery => ({
	...(args.currency && { currency: args.currency }),
	...(args.paxFrom != null && { pax_from: args.paxFrom }),
	...(args.paxTo != null && { pax_to: args.paxTo }),
	...(args.brackets?.length && {
		brackets: args.brackets.map(({ from, to }) => `${from}-${to}`).join(",")
	}),
	...(args.date && { date: args.date }),
	...(args.asOf && { as_of: args.asOf })
});
