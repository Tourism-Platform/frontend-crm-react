import {
	ENUM_EVENT_MODE,
	type THousingDetailsBackend,
	isInheritedHousingDetails,
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

	const details = event?.details as THousingDetailsBackend | undefined;

	return {
		rows: mapSeasonRatesFromHousingDetails(
			isInheritedHousingDetails(details) ? details : undefined
		),
		isLoading,
		isError
	};
};
