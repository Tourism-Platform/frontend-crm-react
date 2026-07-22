import { useEffect, useState } from "react";

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

	const [activeOptionId, setActiveOptionId] = useState("");

	useEffect(() => {
		if (options.length > 0 && !activeOptionId) {
			setActiveOptionId(options[0].id);
		}
	}, [options, activeOptionId]);

	useEffect(() => {
		if (
			activeOptionId &&
			options.length > 0 &&
			!options.some((o) => o.id === activeOptionId)
		) {
			setActiveOptionId(options[0]?.id ?? "");
		}
	}, [options, activeOptionId]);

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
