import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDebounce } from "@/shared/hooks";

import { useGetBookingOrdersQuery } from "../api";
import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type IOrder,
	type TBookingOrderSelectOption
} from "../types";

const DEFAULT_LIMIT = 20;
const DEFAULT_DEBOUNCE_MS = 300;
const DEFAULT_STATUS: ENUM_ORDER_STATUS_TYPE[] = [ENUM_ORDER_STATUS.BOOKING];

type TUseBookingOrderSearchOptionsParams = {
	limit?: number;
	debounceMs?: number;
	enabled?: boolean;
	status?: ENUM_ORDER_STATUS_TYPE[];
};

type TUseBookingOrderSearchOptionsResult = {
	options: TBookingOrderSelectOption[];
	isLoading: boolean;
	isLoadingMore: boolean;
	hasMore: boolean;
	query: string;
	setQuery: (value: string) => void;
	loadMore: () => void;
};

const toOption = (item: IOrder): TBookingOrderSelectOption => ({
	value: item.orderId,
	label: item.orderNumber || item.orderId,
	orderNumber: item.orderNumber,
	client: item.client,
	clientType: item.clientType,
	tourName: item.tourName,
	orderType: item.orderType,
	dates: item.dates,
	pax: item.pax,
	status: item.status,
	dateCreated: item.dateCreated
});

export const useBookingOrderSearchOptions = (
	params: TUseBookingOrderSearchOptionsParams = {}
): TUseBookingOrderSearchOptionsResult => {
	const {
		limit = DEFAULT_LIMIT,
		debounceMs = DEFAULT_DEBOUNCE_MS,
		enabled = true,
		status = DEFAULT_STATUS
	} = params;

	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [accumulated, setAccumulated] = useState<IOrder[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const requestIdRef = useRef(0);
	const debouncedQuery = useDebounce(query, debounceMs);
	const trimmedQuery = debouncedQuery.trim();
	const statusKey = status.join(",");

	useEffect(() => {
		requestIdRef.current += 1;
		setPage(1);
		setAccumulated([]);
		setTotalCount(0);
	}, [trimmedQuery, statusKey]);

	const { data, isLoading, isFetching, isSuccess } = useGetBookingOrdersQuery(
		{
			search: trimmedQuery,
			page,
			limit,
			status
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

			const existingIds = new Set(prev.map((item) => item.orderId));
			const nextItems = data.data.filter(
				(item) => !existingIds.has(item.orderId)
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
