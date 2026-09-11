import type { ITransferProduct } from "@/entities/supplier";

export * from "./transfer-product-tabs.types";

export interface ITransferProductEditProps {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: ITransferProduct | null;
}
