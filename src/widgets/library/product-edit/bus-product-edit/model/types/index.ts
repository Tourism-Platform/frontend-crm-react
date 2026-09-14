import type { IBusProduct } from "@/entities/supplier";

export * from "./bus-product-tabs.types";
export * from "./form.types";

export interface IBusProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IBusProduct | null;
}
