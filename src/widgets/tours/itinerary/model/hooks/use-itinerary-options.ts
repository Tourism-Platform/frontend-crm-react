import { useEffect, useState } from "react";

import { useListAllTourOptionsQuery } from "@/entities/tour";

export const useItineraryOptions = (tourId: string) => {
	const { data: options = [], isLoading } = useListAllTourOptionsQuery(
		tourId,
		{ skip: !tourId }
	);

	const [activeOption, setActiveOption] = useState<string>("");

	useEffect(() => {
		if (options.length > 0 && !activeOption) {
			setActiveOption(options[0].id);
		}
	}, [options, activeOption]);

	const handleOptionDeleted = (optionId: string) => {
		if (activeOption !== optionId) return;
		const remaining = options.filter((o) => o.id !== optionId);
		setActiveOption(remaining.length > 0 ? remaining[0].id : "");
	};

	return {
		options,
		activeOption,
		setActiveOption,
		isLoading,
		handleOptionDeleted
	};
};
