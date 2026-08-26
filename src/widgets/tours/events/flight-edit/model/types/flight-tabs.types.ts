import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TFlightEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TFlightEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
>;
