import { type IRecentSearch, type IRecentSearchBackend } from "../types";

export const mapRecentlySearchToFrontend = (
	data: IRecentSearchBackend
): IRecentSearch => ({
	id: data.id,
	destination: data.id,
	label: data.label,
	dates: {
		from: data.date_from,
		to: data.date_to
	}
});

export const mapRecentlySearchesToFrontend = (
	data: IRecentSearchBackend[]
): IRecentSearch[] => data.map(mapRecentlySearchToFrontend);
