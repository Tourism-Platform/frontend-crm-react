import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TInfoEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<IQueryTabSlotProps<TInfoEditSchema>, "form" | "isLoading">
> &
	// Manual save only: autosaved pages pass no `onSubmit` and the slot hides its button.
	Pick<IQueryTabSlotProps<TInfoEditSchema>, "onSubmit">;
