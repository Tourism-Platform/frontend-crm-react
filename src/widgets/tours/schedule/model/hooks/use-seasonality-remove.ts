import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	type ISeasonality,
	useRemoveSeasonalityMutation
} from "@/entities/tour";

interface IUseSeasonalityRemoveProps {
	tourId: string;
	form: UseFormReturn<{ seasonality: Partial<ISeasonality>[] }>;
	remove: (index: number) => void;
}

export const useSeasonalityRemove = ({
	tourId,
	form,
	remove
}: IUseSeasonalityRemoveProps) => {
	const { t } = useTranslation("tour_schedule_page");

	const [removeSeasonality, { isLoading: isRemoving }] =
		useRemoveSeasonalityMutation();

	const handleRemove = async (index: number) => {
		const id = form.getValues().seasonality[index]?.id;
		try {
			if (id) {
				await removeSeasonality({ tourId, commissionId: id }).unwrap();
				toast.success(t("seasonality.toasts.removed"));
			}
			remove(index);
		} catch {
			toast.error(t("seasonality.toasts.error"));
		}
	};

	return { handleRemove, isRemoving };
};
