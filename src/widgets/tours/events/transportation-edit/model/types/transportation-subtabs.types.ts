import type { TTourEventTransportationEditPageKeys } from "@/shared/config";

export const ENUM_TRANSPORTATION_EDIT_SUBTAB = {
	TRAIN: "train",
	BUS: "bus",
	TRANSFER: "transfer"
} as const;

export type ENUM_TRANSPORTATION_EDIT_SUBTAB_TYPE =
	(typeof ENUM_TRANSPORTATION_EDIT_SUBTAB)[keyof typeof ENUM_TRANSPORTATION_EDIT_SUBTAB];

export interface ITransportationEditSubTabs {
	label: TTourEventTransportationEditPageKeys;
	type: ENUM_TRANSPORTATION_EDIT_SUBTAB_TYPE;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
