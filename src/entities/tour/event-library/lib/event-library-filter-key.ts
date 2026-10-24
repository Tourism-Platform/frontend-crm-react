import type { IEventLibraryFilters } from "../types";

/** Ключ набора фильтров: страницы одного ключа склеиваются в один список */
export const getEventLibraryFilterKey = (
	filters: Pick<IEventLibraryFilters, "status" | "search">
): string => `${filters.status.join(",")}/${filters.search?.trim() ?? ""}`;
