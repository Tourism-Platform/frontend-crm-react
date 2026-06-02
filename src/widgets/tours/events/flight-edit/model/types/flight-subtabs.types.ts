import type { TTourEventFlightEditPageKeys } from "@/shared/config";

import type { ENUM_FLIGHT_TRANSPORT_TYPE_TYPE } from "@/entities/tour";

export type { ENUM_FLIGHT_TRANSPORT_TYPE_TYPE };

export interface IFlightSubTabs {
	label: TTourEventFlightEditPageKeys;
	type: ENUM_FLIGHT_TRANSPORT_TYPE_TYPE;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
