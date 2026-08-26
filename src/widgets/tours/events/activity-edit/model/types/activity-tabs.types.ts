import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TActivityEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TActivityEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
>;
