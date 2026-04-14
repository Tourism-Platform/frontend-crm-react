import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	type ISeasonality,
	useCreateSeasonalityMutation,
	useUpdateSeasonalityMutation
} from "@/entities/tour";

interface IUseSeasonalitySaveProps {
	tourId: string;
	form: UseFormReturn<{ seasonality: Partial<ISeasonality>[] }>;
}

export const useSeasonalitySave = ({
	tourId,
	form
}: IUseSeasonalitySaveProps) => {
	const { t } = useTranslation("tour_schedule_page");

	const [createSeasonality, { isLoading: isCreating }] =
		useCreateSeasonalityMutation();
	const [updateSeasonality, { isLoading: isUpdating }] =
		useUpdateSeasonalityMutation();

	const isCheckedPending = isCreating || isUpdating;

	const handleSave = async (index: number) => {
		const row = form.getValues().seasonality[index] as ISeasonality;

		if (!row.from || !row.to || row.commission === undefined) {
			toast.error(t("seasonality.toasts.validation_error"));
			return;
		}

		try {
			if (row.id) {
				await updateSeasonality({
					tourId,
					commissionId: row.id,
					data: row
				}).unwrap();
				toast.success(t("seasonality.toasts.updated"));
			} else {
				await createSeasonality({ tourId, data: row }).unwrap();
				toast.success(t("seasonality.toasts.created"));
			}
		} catch (error) {
			toast.error(t("seasonality.toasts.error"));
			console.error(error);
		}
	};

	return { handleSave, isCheckedPending };
};
