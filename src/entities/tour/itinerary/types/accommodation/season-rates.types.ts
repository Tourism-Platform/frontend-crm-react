import type { IHotelRoomRate } from "@/entities/supplier/types/hotel/rooms.types";

import type { IExtraCostFormRow } from "../extra-cost.types";

import type { ENUM_HOUSING_ROOM_TYPE_TYPE } from "./housing-room-type.types";

/** Строка сезонных цен привязанного продукта: номер × сезон */
export interface IProductSeasonRate extends IHotelRoomRate {
	id: string;
	roomType: ENUM_HOUSING_ROOM_TYPE_TYPE | null;
	roomName: string | null;
	/** `charge.extra_costs` сезона */
	extraCosts: IExtraCostFormRow[];
}
