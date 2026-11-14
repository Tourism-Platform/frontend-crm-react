/** Нет ни одной границы — прочерк, как в пустых ячейках таблиц */
const EMPTY = "—";

/**
 * Возраст тура для карточек и таблицы: диапазон «12–60 лет» (`formatRange` — ключ `card.age`),
 * «12+» без верхней границы (бэкенд отдаёт `age_to: null`), «—» без границ
 */
export const formatTourAge = (
	from: number | null,
	to: number | null,
	formatRange: (from: number, to: number) => string
): string => {
	if (from == null && to == null) return EMPTY;
	if (to == null) return `${from}+`;
	return formatRange(from ?? 0, to);
};

/**
 * Размер группы: диапазон «2–20» (`formatRange` — ключ `card.group`),
 * без нижней границы (`group_size_min: null`) — только максимум
 */
export const formatTourGroup = (
	min: number | null,
	max: number | null,
	formatRange: (min: number, max: number) => string
): string => {
	if (max == null) return EMPTY;
	if (min == null) return String(max);
	return formatRange(min, max);
};
