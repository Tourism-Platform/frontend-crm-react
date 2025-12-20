import { BusIcon, PlaneIcon, TrainIcon } from "@/shared/assets";

import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	type IFlightSubTabs
} from "../types/flight-subtabs.types";

export const FLIGHT_TRANSPORT_TYPE_TABS_LIST: IFlightSubTabs[] = [
	{
		label: "general.flights.tabs.fly",
		type: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
		icon: PlaneIcon
	},
	{
		label: "general.flights.tabs.train",
		type: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
		icon: TrainIcon
	},
	{
		label: "general.flights.tabs.bus",
		type: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
		icon: BusIcon
	}
];
