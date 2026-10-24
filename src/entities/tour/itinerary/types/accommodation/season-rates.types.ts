import type { IHotelRoomRate } from "@/entities/supplier/types/hotel/rooms.types";

/** Сезонные цены привязанного продукта для экрана policy-check */
export interface IProductSeasonRateRow {
	roomLabel: string;
	rates: IHotelRoomRate[];
}
