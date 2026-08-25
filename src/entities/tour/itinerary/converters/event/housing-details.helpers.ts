import type {
	THousingDetailsBackend,
	TInheritedHousingDetailsBackend
} from "../../types";
import { ENUM_HOUSING_SOURCE } from "../../types";

export const isInheritedHousingDetails = (
	details: THousingDetailsBackend | null | undefined
): details is TInheritedHousingDetailsBackend =>
	details?.source === ENUM_HOUSING_SOURCE.INHERITED;
