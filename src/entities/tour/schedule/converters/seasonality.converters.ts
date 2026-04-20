import { format } from "date-fns";

import type {
	ISeasonality,
	TSeasonalityCommissionBackend,
	TSeasonalityCommissionCreateBackend
} from "../types";

export const mapSeasonalityToBackend = (
	frontend: ISeasonality
): TSeasonalityCommissionCreateBackend => ({
	commission: Number(frontend.commission),
	valid_from: format(frontend.from, "yyyy-MM-dd"),
	valid_until: format(frontend.to, "yyyy-MM-dd")
});

export const mapSeasonalityToFrontend = (
	backend: TSeasonalityCommissionBackend
): ISeasonality => ({
	id: backend.id,
	commission: backend.commission,
	from: new Date(backend.valid_from),
	to: new Date(backend.valid_until)
});
