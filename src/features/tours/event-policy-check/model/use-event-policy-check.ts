import { useEventEditIds, usePolicyCheckEventQuery } from "@/entities/tour";

export const useEventPolicyCheck = () => {
	const { tourId, optionId, eventId } = useEventEditIds();

	return usePolicyCheckEventQuery(
		{ tourId, optionId, eventId },
		{ skip: !tourId || !optionId || !eventId }
	);
};
