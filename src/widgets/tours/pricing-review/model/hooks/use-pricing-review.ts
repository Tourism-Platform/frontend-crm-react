import { useCallback, useMemo, useState } from "react";

import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	useGetTourSummaryQuery,
	useListAllTourOptionsQuery
} from "@/entities/tour";

export const usePricingReview = (tourId: string) => {
	const optionsQuery = useListAllTourOptionsQuery(tourId, { skip: !tourId });
	const {
		data: options = [],
		isLoading: isOptionsLoading,
		isFetching: isOptionsFetching,
		isSuccess: isOptionsSuccess,
		isNotFound: isOptionsNotFound,
		isRealError: isOptionsRealError
	} = useOptionalResourceQuery(optionsQuery);

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

	const summaryQuery = useGetTourSummaryQuery(
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
