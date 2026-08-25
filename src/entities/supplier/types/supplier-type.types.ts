export const ENUM_SUPPLIER_TYPE = {
	FLIGHT: "flight",
	HOTEL: "hotel",
	MUSEUM: "museum",
	TRANSFER: "transfer",
	ACTIVITY: "activity",
	TRAIN: "train",
	BUS: "bus"
} as const;

export type ENUM_SUPPLIER_TYPE_TYPE =
	(typeof ENUM_SUPPLIER_TYPE)[keyof typeof ENUM_SUPPLIER_TYPE];
