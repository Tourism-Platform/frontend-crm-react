import {
	ENUM_EVENT_MODE,
	useEventEditIds,
	useGetTourEventQuery
} from "@/entities/tour";

export const useInheritedProductSeasonRates = () => {
	const { tourId, optionId, eventId, eventOptionId, mode } =
		useEventEditIds();

	const {
		data: event,
		isLoading,
		isError
	} = useGetTourEventQuery(
		{
			tourId,
			optionId,
			eventId,
			...(mode === ENUM_EVENT_MODE.MULTI && { eventOptionId })
		},
		{ skip: !tourId || !optionId || !eventId }
	);

	return {
		rows: event?.productSeasonRates ?? [],
		isLoading,
		isError
	};
};
