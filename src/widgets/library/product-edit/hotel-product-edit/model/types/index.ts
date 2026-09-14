import type { IHotelProduct } from "@/entities/supplier";

export * from "./hotel-product-tabs.types";
export * from "./form.types";

export interface IHotelProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IHotelProduct | null;
}
