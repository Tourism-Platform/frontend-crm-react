import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TSupplementEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<IQueryTabSlotProps<TSupplementEditSchema>, "form" | "isLoading">
> &
	// Manual save only: autosaved pages pass no `onSubmit` and the slot hides its button.
	Pick<IQueryTabSlotProps<TSupplementEditSchema>, "onSubmit">;
