import type { IQueryTabSlotProps } from "@/shared/ui";

import type {
	IFlightProduct,
	TFlightProductEditSchema
} from "@/entities/supplier";

export interface IFlightProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IFlightProduct | null;
}

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TFlightProductEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
> &
	IFlightProductEditSlotContext & {
		disabled: boolean;
	};
