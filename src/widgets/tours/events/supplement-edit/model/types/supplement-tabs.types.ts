import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TSupplementEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<
		IQueryTabSlotProps<TSupplementEditSchema>,
		"form" | "onSubmit" | "isLoading"
	>
>;
