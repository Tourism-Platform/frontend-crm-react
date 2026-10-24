import type { TGeoFormValue } from "@/shared/types/geo-form.types";

export const hasGeoFormLabel = (value: TGeoFormValue): boolean =>
	Boolean(value.name?.trim() || value.city?.trim() || value.street?.trim());
