import type { TTourEventFlightEditPageKeys } from "@/shared/config";

export const ENUM_FLIGHT_TRANSPORT_TYPE = {
	FLY: "fly",
	TRAIN: "train",
	BUS: "bus"
} as const;

export type ENUM_FLIGHT_TRANSPORT_TYPE_TYPE =
	(typeof ENUM_FLIGHT_TRANSPORT_TYPE)[keyof typeof ENUM_FLIGHT_TRANSPORT_TYPE];

export interface IFlightSubTabs {
	label: TTourEventFlightEditPageKeys;
	type: ENUM_FLIGHT_TRANSPORT_TYPE_TYPE;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
