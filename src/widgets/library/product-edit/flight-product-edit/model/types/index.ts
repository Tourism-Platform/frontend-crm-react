import type { IFlightProduct } from "@/entities/supplier";

export * from "./flight-product-tabs.types";
export * from "./form.types";

export interface IFlightProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IFlightProduct | null;
}
