import type { IQueryTabSlotProps } from "@/shared/ui";

import type {
	IActivityProduct,
	TActivityProductEditSchema
} from "@/entities/supplier";

export interface IActivityProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IActivityProduct | null;
}

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TActivityProductEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
> &
	IActivityProductEditSlotContext & {
		disabled: boolean;
	};
