import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	type ISeasonality,
	useCreateSeasonalityMutation,
	useUpdateSeasonalityMutation
} from "@/entities/tour";

import type { TSeasonalityFormValues } from "../types";

interface IUseSeasonalitySaveProps {
	tourId: string;
	form: UseFormReturn<TSeasonalityFormValues>;
}

export const useSeasonalitySave = ({
	tourId,
	form
}: IUseSeasonalitySaveProps) => {
	const { t } = useTranslation("tour_schedule_page");

	const [createSeasonality] = useCreateSeasonalityMutation();
	const [updateSeasonality] = useUpdateSeasonalityMutation();
	const [pendingSaveIndex, setPendingSaveIndex] = useState<number | null>(
		null
	);

	const handleSave = async (index: number) => {
		const row = form.getValues().seasonality[index];
		const from = row.period?.from;
		const to = row.period?.to;
		const commission = Number(row.commission);

		if (!from || !to || !Number.isFinite(commission) || commission < 0) {
			toast.error(t("seasonality.toasts.validation_error"));
			return;
		}

		setPendingSaveIndex(index);

		try {
			const payload: ISeasonality = {
				id: row.id,
				commission,
				from,
				to
			};

			if (row.id) {
				await updateSeasonality({
					tourId,
					commissionId: row.id,
					data: payload
				}).unwrap();
				toast.success(t("seasonality.toasts.updated"));
			} else {
				const saved = await createSeasonality({
					tourId,
					data: payload
				}).unwrap();
				form.setValue(`seasonality.${index}.id`, saved.id, {
					shouldDirty: false
				});
				toast.success(t("seasonality.toasts.created"));
			}
		} catch (error) {
			toast.error(t("seasonality.toasts.error"));
			console.error(error);
		} finally {
			setPendingSaveIndex(null);
		}
	};

	return { handleSave, pendingSaveIndex };
};
