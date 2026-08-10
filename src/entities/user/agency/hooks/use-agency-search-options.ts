import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDebounce } from "@/shared/hooks";

import { useListAgenciesQuery } from "../api";
import type { TAgencyListItem, TAgencySelectOption } from "../types";

const DEFAULT_LIMIT = 20;
const DEFAULT_DEBOUNCE_MS = 300;

type TUseAgencySearchOptionsParams = {
	limit?: number;
	debounceMs?: number;
	skip?: boolean;
};

type TUseAgencySearchOptionsResult = {
	options: TAgencySelectOption[];
	isLoading: boolean;
	isLoadingMore: boolean;
	hasMore: boolean;
	query: string;
	setQuery: (value: string) => void;
	loadMore: () => void;
};

const toOption = (item: TAgencyListItem): TAgencySelectOption => ({
	value: item.id,
	label: item.businessName || item.name,
	name: item.name,
	contactPerson: item.contactPerson,
	contactEmail: item.contactEmail,
	contactPhone: item.contactPhone,
	logoUrl: item.logoUrl
});

export const useAgencySearchOptions = (
	params: TUseAgencySearchOptionsParams = {}
): TUseAgencySearchOptionsResult => {
	const {
		limit = DEFAULT_LIMIT,
		debounceMs = DEFAULT_DEBOUNCE_MS,
		skip = false
	} = params;

	const [query, setQuery] = useState("");
	const [skipCount, setSkipCount] = useState(0);
	const [accumulated, setAccumulated] = useState<TAgencyListItem[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const requestIdRef = useRef(0);
	const debouncedQuery = useDebounce(query, debounceMs);
	const trimmedQuery = debouncedQuery.trim();

	useEffect(() => {
		requestIdRef.current += 1;
		setSkipCount(0);
		setAccumulated([]);
		setTotalCount(0);
	}, [trimmedQuery]);

	const { data, isLoading, isFetching, isSuccess } = useListAgenciesQuery(
		{
			q: trimmedQuery || null,
			skip: skipCount,
			limit
		},
		{ skip }
	);

	useEffect(() => {
		if (!data || !isSuccess) {
			return;
		}

		const requestId = requestIdRef.current;

		setTotalCount(data.total);
		setAccumulated((prev) => {
			if (requestId !== requestIdRef.current) {
				return prev;
			}

			if (skipCount === 0) {
				return data.data;
			}

			const existingIds = new Set(prev.map((item) => item.id));
			const nextItems = data.data.filter(
				(item) => !existingIds.has(item.id)
			);
			return [...prev, ...nextItems];
		});
	}, [data, skipCount, isSuccess]);

	const hasMore = useMemo(
		() => totalCount > 0 && accumulated.length < totalCount,
		[accumulated.length, totalCount]
	);

	const loadMore = useCallback(() => {
		if (!hasMore || isFetching) {
			return;
		}
		setSkipCount((prev) => prev + limit);
	}, [hasMore, isFetching, limit]);

	const isInitialLoading =
		!skip && (isLoading || isFetching) && accumulated.length === 0;
	const isLoadingMore =
		!skip && isFetching && skipCount > 0 && accumulated.length > 0;

	return {
		options: accumulated.map(toOption),
		isLoading: isInitialLoading,
		isLoadingMore,
		hasMore: !skip && hasMore,
		query,
		setQuery,
		loadMore
	};
};
