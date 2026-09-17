import type { IQueryTabSlotProps } from "@/shared/ui";

import type { IBusProduct, TBusProductEditSchema } from "@/entities/supplier";

export interface IBusProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IBusProduct | null;
}

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TBusProductEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
> &
	IBusProductEditSlotContext & {
		disabled: boolean;
	};
