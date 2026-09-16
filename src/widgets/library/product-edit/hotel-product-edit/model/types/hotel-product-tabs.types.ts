import type { IQueryTabSlotProps } from "@/shared/ui";

import type {
	IHotelProduct,
	THotelProductEditSchema
} from "@/entities/supplier";

export interface IHotelProductEditSlotContext {
	supplierId: string;
	productId: string;
	isCreate: boolean;
	product?: IHotelProduct | null;
}

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<THotelProductEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
> &
	IHotelProductEditSlotContext & {
		disabled: boolean;
	};
