import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useRemoveSeasonalityMutation } from "@/entities/tour";

import type { TSeasonalityFormValues } from "../types";

interface IUseSeasonalityRemoveProps {
	tourId: string;
	form: UseFormReturn<TSeasonalityFormValues>;
	remove: (index: number) => void;
}

export const useSeasonalityRemove = ({
	tourId,
	form,
	remove
}: IUseSeasonalityRemoveProps) => {
	const { t } = useTranslation("tour_schedule_page");

	const [removeSeasonality] = useRemoveSeasonalityMutation();
	const [pendingRemoveIndex, setPendingRemoveIndex] = useState<number | null>(
		null
	);

	const handleRemove = async (index: number) => {
		const id = form.getValues().seasonality[index]?.id;
		setPendingRemoveIndex(index);

		try {
			if (id) {
				await removeSeasonality({ tourId, commissionId: id }).unwrap();
				toast.success(t("seasonality.toasts.removed"));
			}
			remove(index);
		} catch {
			toast.error(t("seasonality.toasts.error"));
		} finally {
			setPendingRemoveIndex(null);
		}
	};

	return { handleRemove, pendingRemoveIndex };
};
