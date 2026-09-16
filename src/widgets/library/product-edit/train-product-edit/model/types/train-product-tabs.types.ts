import type { IQueryTabSlotProps } from "@/shared/ui";

import type {
	ITrainProduct,
	TTrainProductEditSchema
} from "@/entities/supplier";

export interface ITrainProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: ITrainProduct | null;
}

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TTrainProductEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
> &
	ITrainProductEditSlotContext & {
		disabled: boolean;
	};
