import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDebounce } from "@/shared/hooks";

import {
	type IOperatorAgencyListItem,
	useListOperatorAgenciesQuery
} from "@/entities/user/operator";

import type { TAgencySelectOption } from "../types";

const DEFAULT_LIMIT = 20;
const DEFAULT_DEBOUNCE_MS = 300;

type TUseAgencySearchOptionsParams = {
	limit?: number;
	debounceMs?: number;
	enabled?: boolean;
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

const toOption = (item: IOperatorAgencyListItem): TAgencySelectOption => ({
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
		enabled = true
	} = params;

	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [accumulated, setAccumulated] = useState<IOperatorAgencyListItem[]>(
		[]
	);
	const [totalCount, setTotalCount] = useState(0);
	const requestIdRef = useRef(0);
	const debouncedQuery = useDebounce(query, debounceMs);
	const trimmedQuery = debouncedQuery.trim();

	useEffect(() => {
		requestIdRef.current += 1;
		setPage(1);
		setAccumulated([]);
		setTotalCount(0);
	}, [trimmedQuery]);

	const { data, isLoading, isFetching, isSuccess } =
		useListOperatorAgenciesQuery(
			{
				search: trimmedQuery || undefined,
				page,
				limit
			},
			{ skip: !enabled }
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

			if (page === 1) {
				return data.data;
			}

			const existingIds = new Set(prev.map((item) => item.id));
			const nextItems = data.data.filter(
				(item) => !existingIds.has(item.id)
			);
			return [...prev, ...nextItems];
		});
	}, [data, page, isSuccess]);

	const hasMore = useMemo(
		() => totalCount > 0 && accumulated.length < totalCount,
		[accumulated.length, totalCount]
	);

	const loadMore = useCallback(() => {
		if (!hasMore || isFetching) {
			return;
		}
		setPage((prev) => prev + 1);
	}, [hasMore, isFetching]);

	const isInitialLoading =
		enabled && (isLoading || isFetching) && accumulated.length === 0;
	const isLoadingMore =
		enabled && isFetching && page > 1 && accumulated.length > 0;

	return {
		options: accumulated.map(toOption),
		isLoading: isInitialLoading,
		isLoadingMore,
		hasMore: enabled && hasMore,
		query,
		setQuery,
		loadMore
	};
};
