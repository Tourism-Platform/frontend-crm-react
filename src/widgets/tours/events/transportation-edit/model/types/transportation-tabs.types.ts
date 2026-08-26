import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TTransportationEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TTransportationEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
>;
