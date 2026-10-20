import { useCallback, useMemo, useState } from "react";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	useGetPricingBreakdownQuery,
	useListAllTourOptionsQuery
} from "@/entities/tour";

export const usePricingReview = (tourId: string) => {
	const optionsQuery = useListAllTourOptionsQuery(
		{ page: 1, limit: INTERSECTION_ELEMENTS.TOUR_OPTIONS, tourId },
		{ skip: !tourId }
	);
	const {
		data: optionsPage,
		isLoading: isOptionsLoading,
		isFetching: isOptionsFetching,
		isSuccess: isOptionsSuccess,
		isNotFound: isOptionsNotFound,
		isRealError: isOptionsRealError
	} = useOptionalResourceQuery(optionsQuery);
	const options = useMemo(() => optionsPage?.data ?? [], [optionsPage]);

	const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
		null
	);

	const activeOptionId = useMemo(() => {
		if (
			selectedOptionId &&
			options.some((option) => option.id === selectedOptionId)
		) {
			return selectedOptionId;
		}

		return options[0]?.id ?? "";
	}, [selectedOptionId, options]);

	const setActiveOptionId = useCallback((optionId: string) => {
		setSelectedOptionId(optionId);
	}, []);

	const summaryQuery = useGetPricingBreakdownQuery(
		{ tourId, optionId: activeOptionId },
		{ skip: !tourId || !activeOptionId }
	);
	const {
		data: pricingReview,
		isLoading: isSummaryLoading,
		isFetching: isSummaryFetching,
		isSuccess: isSummarySuccess,
		isNotFound: isSummaryNotFound,
		isRealError: isSummaryRealError
	} = useOptionalResourceQuery(summaryQuery);

	return {
		options,
		activeOptionId,
		setActiveOptionId,
		pricingReview,
		isOptionsLoading,
		isOptionsFetching,
		isOptionsSuccess,
		isOptionsNotFound,
		isOptionsRealError,
		isSummaryLoading,
		isSummaryFetching,
		isSummarySuccess,
		isSummaryNotFound,
		isSummaryRealError,
		hasOptions: options.length > 0
	};
};
