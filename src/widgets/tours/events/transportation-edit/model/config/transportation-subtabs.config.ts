import { BusIcon, DrivingIcon, TrainIcon } from "@/shared/assets";

import {
	ENUM_TRANSPORTATION_EDIT_SUBTAB,
	type ITransportationEditSubTabs
} from "../types";

export const TRANSPORTATION_EDIT_SUBTABS_LIST: ITransportationEditSubTabs[] = [
	{
		label: "general.subtype.tabs.train",
		type: ENUM_TRANSPORTATION_EDIT_SUBTAB.TRAIN,
		icon: TrainIcon
	},
	{
		label: "general.subtype.tabs.bus",
		type: ENUM_TRANSPORTATION_EDIT_SUBTAB.BUS,
		icon: BusIcon
	},
	{
		label: "general.subtype.tabs.transfer",
		type: ENUM_TRANSPORTATION_EDIT_SUBTAB.TRANSFER,
		icon: DrivingIcon
	}
];
