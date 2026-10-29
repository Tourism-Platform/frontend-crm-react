import {
	ENUM_GUIDE_PRICE_BOUND_FIELD,
	type IGuidePriceBound,
	type TPerGroupTierBackend,
	type TPerGroupTierInputBackend
} from "../../../types";

type TTier = TPerGroupTierBackend | TPerGroupTierInputBackend;

const sortTiers = (tiers: TTier[]) =>
	[...tiers].sort((a, b) => a.up_to_pax - b.up_to_pax);

/** Shared column bounds: every tier but the open-ended last one. */
export const mapGuidePriceBoundsFromBackend = (
	tiers?: TTier[] | null
): number[] =>
	sortTiers(tiers ?? [])
		.slice(0, -1)
		.map((tier) => tier.up_to_pax);

/** Group size a column stands for: its own bound, or one past the last. */
export const getGuideColumnPax = (bounds: number[], column: number): number =>
	bounds[column] ?? (bounds.at(-1) ?? 0) + 1;

/**
 * Tier the backend picks for `pax`: the first with `pax ≤ up_to_pax`,
 * the last one above every bound (fe6.6 §3).
 */
export const getGuideTierCostAt = (
	tiers: TTier[],
	pax: number
): number | null => {
	const sorted = sortTiers(tiers);
	const tier = sorted.find((item) => pax <= item.up_to_pax) ?? sorted.at(-1);
	return tier?.cost?.val ?? null;
};

/** Rows are validated whole: a priced row fills every column. */
export const mapGuidePriceTiersToBackend = (
	bounds: IGuidePriceBound[],
	costs: (number | null)[],
	toMoney: (val: number) => TPerGroupTierInputBackend["cost"]
): TPerGroupTierInputBackend[] => {
	const upToPax = bounds.map((bound) =>
		Number(bound[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX])
	);

	return [...upToPax, getGuideColumnPax(upToPax, upToPax.length)].map(
		(up_to_pax, index) => ({
			up_to_pax,
			cost: toMoney(costs[index] ?? 0)
		})
	);
};
