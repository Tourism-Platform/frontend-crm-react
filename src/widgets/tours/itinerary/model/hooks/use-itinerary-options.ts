import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	useCreateTourOptionMutation,
	useDeleteOptionMutation,
	useListAllTourOptionsQuery
} from "@/entities/tour";

import type { IOption } from "../types";

export const useItineraryOptions = (tourId: string) => {
	const { t } = useTranslation("tour_itinerary_page");

	const { data: backendOptions = [], isLoading } = useListAllTourOptionsQuery(
		tourId,
		{ skip: !tourId }
	);

	const [createOption] = useCreateTourOptionMutation();
	const [deleteOption] = useDeleteOptionMutation();

	const options: IOption[] = useMemo(
		() =>
			backendOptions.map((opt, idx) => ({
				id: opt.id,
				name: `Option ${idx + 1}`
			})),
		[backendOptions]
	);

	const [activeOption, setActiveOption] = useState<string>("");

	useEffect(() => {
		if (options.length > 0 && !activeOption) {
			setActiveOption(options[0].id);
		}
	}, [options, activeOption]);

	const handleAddOption = () => {
		const createPromise = createOption({ tourId }).unwrap();

		toast.promise(createPromise, {
			loading: t("toasts.option.create.loading"),
			success: (newOption) => {
				setActiveOption(newOption.id);
				return t("toasts.option.create.success");
			},
			error: t("toasts.option.create.error")
		});
	};

	const handleDeleteOption = (optionId: string) => {
		const prevActiveOption = activeOption;

		// Оптимистично переключаем таб, если удаляем активный
		if (activeOption === optionId) {
			const remaining = options.filter((o) => o.id !== optionId);
			setActiveOption(remaining.length > 0 ? remaining[0].id : "");
		}

		const deletePromise = deleteOption({ tourId, optionId }).unwrap();

		toast.promise(deletePromise, {
			loading: t("toasts.option.delete.loading"),
			success: t("toasts.option.delete.success"),
			error: () => {
				// Rollback активного таба при ошибке
				setActiveOption(prevActiveOption);
				return t("toasts.option.delete.error");
			}
		});
	};

	return {
		options,
		activeOption,
		setActiveOption,
		isLoading,
		handleAddOption,
		handleDeleteOption
	};
};
