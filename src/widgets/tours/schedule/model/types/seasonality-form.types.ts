import type { ISeasonality } from "@/entities/tour";

export type TSeasonalityFormRow = Omit<Partial<ISeasonality>, "from" | "to"> & {
	period?: { from?: Date; to?: Date };
};

export type TSeasonalityFormValues = {
	seasonality: TSeasonalityFormRow[];
};
