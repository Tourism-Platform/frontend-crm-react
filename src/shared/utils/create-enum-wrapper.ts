/**
 * Двусторонний маппер enum'ов. `from` принимает и сам enum `B`, и его строковые
 * значения (`${B}`) — generated-схемы местами описывают дискриминаторы литералами.
 * При многие-к-одному `from` возвращает последний ключ с этим значением.
 */
export const createEnumMapper = <A extends string, B extends string>(
	map: Partial<Record<A, B>>
) => {
	const reverse = Object.entries(map).reduce(
		(acc, [a, b]) => {
			if (!b) return acc;
			acc[b as string] = a as A;
			return acc;
		},
		{} as Partial<Record<string, A>>
	);

	return {
		to: (value: A | null | undefined): B | undefined =>
			value != null ? map[value] : undefined,
		from: (value: B | `${B}` | null | undefined): A | undefined =>
			value != null ? reverse[value] : undefined,

		toMany: (values: (A | null | undefined)[]): B[] =>
			values
				.map((v) => (v != null ? map[v] : undefined))
				.filter(Boolean) as B[],

		fromMany: (values: (B | `${B}` | null | undefined)[]): A[] =>
			values
				.map((v) => (v != null ? reverse[v] : undefined))
				.filter(Boolean) as A[]
	};
};
