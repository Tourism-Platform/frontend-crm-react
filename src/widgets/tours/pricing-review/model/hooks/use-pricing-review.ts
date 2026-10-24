import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { isNoFxRateError } from "@/shared/api";
import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useDebounce, useOptionalResourceQuery } from "@/shared/hooks";

import {
	ENUM_PRICING_BREAKDOWN_PARAM,
	type IPricingBreakdownParams,
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

	const paramsForm = useForm<IPricingBreakdownParams>({
		defaultValues: {
			date: null,
			pax: null
		}
	});
	const { watch, setValue } = paramsForm;
	const { date, pax } = watch();
	// Не пересчитывать на каждый набранный символ
	const debouncedPax = useDebounce(pax, 500);

	const handleResetParams = useCallback(() => {
		setValue(ENUM_PRICING_BREAKDOWN_PARAM.DATE, null);
		setValue(ENUM_PRICING_BREAKDOWN_PARAM.PAX, null);
	}, [setValue]);

	const summaryQuery = useGetPricingBreakdownQuery(
		{ tourId, optionId: activeOptionId, date, pax: debouncedPax },
		{ skip: !tourId || !activeOptionId }
	);
	const {
		data: pricingReview,
		error: summaryError,
		isLoading: isSummaryLoading,
		isFetching: isSummaryFetching,
		isSuccess: isSummarySuccess,
		isNotFound: isSummaryNotFound,
		isRealError: isSummaryRealError
	} = useOptionalResourceQuery(summaryQuery);
	// 422 — нет курса ЦБ для одной из валют цен тура
	const isSummaryNoFxRate =
		isSummaryRealError && isNoFxRateError(summaryError);

	return {
		options,
		activeOptionId,
		setActiveOptionId,
		paramsForm,
		handleResetParams,
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
		isSummaryNoFxRate,
		hasOptions: options.length > 0
	};
};
