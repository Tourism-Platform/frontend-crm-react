import { useEffect, useState } from "react";

import {
	useGetTourSummaryQuery,
	useListAllTourOptionsQuery
} from "@/entities/tour";

export const usePricingReview = (tourId: string) => {
	const {
		data: options = [],
		isLoading: isOptionsLoading,
		isError: isOptionsError
	} = useListAllTourOptionsQuery(tourId, { skip: !tourId });

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

	const {
		data: pricingReview,
		isLoading: isSummaryLoading,
		isFetching: isSummaryFetching,
		isError: isSummaryError
	} = useGetTourSummaryQuery(
		{ tourId, optionId: activeOptionId },
		{ skip: !tourId || !activeOptionId }
	);

	return {
		options,
		activeOptionId,
		setActiveOptionId,
		pricingReview,
		isOptionsLoading,
		isOptionsError,
		isSummaryLoading,
		isSummaryFetching,
		isSummaryError,
		hasOptions: options.length > 0
	};
};
