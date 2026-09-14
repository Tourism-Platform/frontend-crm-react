import type { ITrainProduct } from "@/entities/supplier";

export * from "./train-product-tabs.types";
export * from "./form.types";

export interface ITrainProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: ITrainProduct | null;
}
