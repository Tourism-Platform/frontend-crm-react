import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TMultiplyOptionEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TMultiplyOptionEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
>;
