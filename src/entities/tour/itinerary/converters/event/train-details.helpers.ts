import type {
	TInheritedTrainDetailsBackend,
	TTrainDetailsBackend
} from "../../types";

export const isInheritedTrainDetails = (
	details: TTrainDetailsBackend | null | undefined
): details is TInheritedTrainDetailsBackend => details?.source === "inherited";
