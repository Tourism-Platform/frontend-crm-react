import type { IActivityProduct } from "@/entities/supplier";

export * from "./activity-product-tabs.types";

export interface IActivityProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IActivityProduct | null;
}
