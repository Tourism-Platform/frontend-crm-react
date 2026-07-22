export type TFocTierRow = {
	minPax: number | null;
	free: number | null;
};

export const createEmptyFocTier = (): TFocTierRow => ({
	minPax: null,
	free: null
});

export const removeFocTierAt = (
	tiers: TFocTierRow[],
	index: number
): TFocTierRow[] => tiers.filter((_, tierIndex) => tierIndex !== index);

export const appendFocTier = (tiers: TFocTierRow[]): TFocTierRow[] => [
	...tiers,
	createEmptyFocTier()
];
