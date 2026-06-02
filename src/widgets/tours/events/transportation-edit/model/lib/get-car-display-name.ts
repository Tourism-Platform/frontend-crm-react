import { CAR_NAME_OPTIONS } from "@/shared/config";

export const getCarDisplayName = (carName: string) =>
	CAR_NAME_OPTIONS.find((option) => option.value === carName)?.label ??
	carName;
