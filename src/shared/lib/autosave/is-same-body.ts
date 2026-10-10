const sortKeys = (value: unknown): unknown => {
	if (Array.isArray(value)) return value.map(sortKeys);
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.keys(value)
				.sort()
				.filter(
					(key) =>
						(value as Record<string, unknown>)[key] !== undefined
				)
				.map((key) => [
					key,
					sortKeys((value as Record<string, unknown>)[key])
				])
		);
	}
	return value;
};

/** Key-order independent body equality (`undefined` keys are ignored, as in JSON). */
export const isSameBody = (a: unknown, b: unknown): boolean =>
	JSON.stringify(sortKeys(a)) === JSON.stringify(sortKeys(b));
