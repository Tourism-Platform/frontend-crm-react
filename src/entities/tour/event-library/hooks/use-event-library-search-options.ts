import { useCallback, useState } from "react";

import { useDebounce } from "@/shared/hooks";

import type { ENUM_EVENT_TYPE } from "@/entities/tour/itinerary";

import { useListEventLibraryInfiniteQuery } from "../api";
import { getEventLibraryFilterKey } from "../converters";
import type { IEventLibraryItem } from "../types";

const DEFAULT_LIMIT = 20;
const DEFAULT_DEBOUNCE_MS = 300;

type TUseEventLibrarySearchOptionsParams = {
	limit?: number;
	debounceMs?: number;
	enabled?: boolean;
};

type TUseEventLibrarySearchOptionsResult = {
	items: IEventLibraryItem[];
	isLoading: boolean;
	isLoadingMore: boolean;
	hasMore: boolean;
	query: string;
	setQuery: (value: string) => void;
	status: ENUM_EVENT_TYPE[];
	setStatus: (value: ENUM_EVENT_TYPE[]) => void;
	loadMore: () => void;
	reset: () => void;
};

type TListArgs = {
	search: string;
	status: ENUM_EVENT_TYPE[];
	page: number;
};

const INITIAL_ARGS: TListArgs = { search: "", status: [], page: 1 };

/**
 * Infinite event library list. Pages are merged in the RTK cache (one entry
 * per status + search); the page is reset together with the filter, in the
 * same render, so a request never mixes a new filter with an old page.
 */
export const useEventLibrarySearchOptions = (
	params: TUseEventLibrarySearchOptionsParams = {}
): TUseEventLibrarySearchOptionsResult => {
	const {
		limit = DEFAULT_LIMIT,
		debounceMs = DEFAULT_DEBOUNCE_MS,
		enabled = true
	} = params;

	const [query, setQuery] = useState("");
	const [args, setArgs] = useState<TListArgs>(INITIAL_ARGS);
	const debouncedQuery = useDebounce(query, debounceMs).trim();
	const [appliedQuery, setAppliedQuery] = useState(debouncedQuery);

	// Apply the debounced search during render (not in an effect): the
	// query below then already sees the new search with page 1.
	if (debouncedQuery !== appliedQuery) {
		setAppliedQuery(debouncedQuery);
		setArgs((prev) => ({ ...prev, search: debouncedQuery, page: 1 }));
	}

	const { currentData, data, isFetching } = useListEventLibraryInfiniteQuery(
		{ ...args, limit },
		{ skip: !enabled }
	);

	// `data` keeps the last result of any filter — use only the current one.
	const filterKey = getEventLibraryFilterKey(args);
	const list =
		(currentData ?? data)?.filterKey === filterKey
			? (currentData ?? data)
			: undefined;

	// `total` is the backend count for the current filter. A short last page
	// has fewer items than `limit`, so compare pages, not item counts.
	const hasMore = !!list && list.page * limit < list.total;

	const loadMore = useCallback(() => {
		if (!hasMore || isFetching) {
			return;
		}
		setArgs((prev) => ({ ...prev, page: (list?.page ?? prev.page) + 1 }));
	}, [hasMore, isFetching, list?.page]);

	const setStatus = useCallback((status: ENUM_EVENT_TYPE[]) => {
		setArgs((prev) => ({ ...prev, status, page: 1 }));
	}, []);

	const reset = useCallback(() => {
		setQuery("");
		setArgs(INITIAL_ARGS);
	}, []);

	return {
		items: list?.data ?? [],
		isLoading: enabled && isFetching && !list,
		isLoadingMore: enabled && isFetching && !!list && args.page > 1,
		hasMore: enabled && hasMore,
		query,
		setQuery,
		status: args.status,
		setStatus,
		loadMore,
		reset
	};
};
