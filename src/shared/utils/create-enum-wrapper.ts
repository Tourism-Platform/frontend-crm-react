export const createEnumMapper = <A extends string, B extends string>(
	map: Partial<Record<A, B>>
) => {
	const reverse = Object.entries(map).reduce(
		(acc, [a, b]) => {
			if (!b) return acc;
			acc[b as B] = a as A;
			return acc;
		},
		{} as Partial<Record<B, A>>
	);

	return {
		to: (value: A): B | undefined => map[value],
		from: (value: B): A | undefined => reverse[value],

		toMany: (values: A[]): B[] =>
			values.map((v) => map[v]).filter(Boolean) as B[],

		fromMany: (values: B[]): A[] =>
			values.map((v) => reverse[v]).filter(Boolean) as A[]
	};
};
