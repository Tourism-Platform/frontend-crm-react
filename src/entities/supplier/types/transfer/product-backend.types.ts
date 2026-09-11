import type {
	TransferProductCreate,
	TransferProductReadOutput,
	TransferProductUpdate,
	TransferVariantReadOutput,
	TransferVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateTransferProductBackend = Extract<
	TCreateProductBodyBackend,
	TransferProductCreate
>;

export type TTransferProductReadBackend = TransferProductReadOutput;
export type TUpdateTransferProductBackend = TransferProductUpdate;
export type TTransferVariantWriteBackend = TransferVariantWrite;
export type TTransferVariantReadBackend = TransferVariantReadOutput;
