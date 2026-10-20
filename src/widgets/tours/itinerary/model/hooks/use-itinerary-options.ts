import { useCallback, useMemo, useState } from "react";

import { INTERSECTION_ELEMENTS } from "@/shared/config";

import { useListAllTourOptionsQuery } from "@/entities/tour";

export const useItineraryOptions = (tourId: string) => {
	const { data: optionsPage, isLoading } = useListAllTourOptionsQuery(
		{ page: 1, limit: INTERSECTION_ELEMENTS.TOUR_OPTIONS, tourId },
		{ skip: !tourId }
	);
	const options = useMemo(() => optionsPage?.data ?? [], [optionsPage]);

	const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
		null
	);

	const activeOptionId = selectedOptionId ?? options[0]?.id ?? "";

	const setActiveOption = useCallback((optionId: string) => {
		setSelectedOptionId(optionId);
	}, []);

	const handleOptionDeleted = (optionId: string) => {
		if (activeOptionId !== optionId) return;
		const remaining = options.filter((o) => o.id !== optionId);
		setSelectedOptionId(remaining.length > 0 ? remaining[0].id : null);
	};

	return {
		options,
		activeOption: activeOptionId,
		setActiveOption,
		isLoading,
		handleOptionDeleted
	};
};
