import {
	ENUM_SUPPLIER_TYPE,
	type ENUM_SUPPLIER_TYPE_TYPE
} from "@/entities/supplier/types/supplier-type.types";

import {
	ENUM_EVENT_KIND,
	type ENUM_EVENT_KIND_TYPE,
	ENUM_FLIGHT_TRANSPORT_TYPE,
	type ENUM_FLIGHT_TRANSPORT_TYPE_TYPE
} from "../types";

/**
 * Карточка FLIGHT на борде — это flight, train или bus. Вид транспорта из
 * формы задаёт вид события (пул, override) и тип поставщиков для поиска.
 */
export const FLIGHT_TRANSPORT_TYPE_CONFIG: Record<
	ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	{ eventKind: ENUM_EVENT_KIND_TYPE; supplierTyp: ENUM_SUPPLIER_TYPE_TYPE }
> = {
	[ENUM_FLIGHT_TRANSPORT_TYPE.FLY]: {
		eventKind: ENUM_EVENT_KIND.FLIGHT,
		supplierTyp: ENUM_SUPPLIER_TYPE.FLIGHT
	},
	[ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN]: {
		eventKind: ENUM_EVENT_KIND.TRAIN,
		supplierTyp: ENUM_SUPPLIER_TYPE.TRAIN
	},
	[ENUM_FLIGHT_TRANSPORT_TYPE.BUS]: {
		eventKind: ENUM_EVENT_KIND.BUS,
		supplierTyp: ENUM_SUPPLIER_TYPE.BUS
	}
};
