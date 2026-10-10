import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TActivityEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<IQueryTabSlotProps<TActivityEditSchema>, "form" | "isLoading">
> &
	// Manual save only: autosaved pages pass no `onSubmit` and the slot hides its button.
	Pick<IQueryTabSlotProps<TActivityEditSchema>, "onSubmit">;
