import {
	ENUM_EVENT_MODE,
	useEventEditIds,
	useGetTourEventQuery
} from "@/entities/tour";

import { mapSeasonRatesFromHousingDetails } from "./map-season-rates-from-details";

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
		// The mapper itself guards on product supply + per-room spec.
		rows: mapSeasonRatesFromHousingDetails(event?.details),
		isLoading,
		isError
	};
};
