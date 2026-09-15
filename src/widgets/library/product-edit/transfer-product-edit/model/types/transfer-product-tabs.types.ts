import type { IQueryTabSlotProps } from "@/shared/ui";

import type {
	ITransferProduct,
	TTransferProductEditSchema
} from "@/entities/supplier";

export interface ITransferProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: ITransferProduct | null;
}

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TTransferProductEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
> &
	ITransferProductEditSlotContext & {
		disabled: boolean;
	};
