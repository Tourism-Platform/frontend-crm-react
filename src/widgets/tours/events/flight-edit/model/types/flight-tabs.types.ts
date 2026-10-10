import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TFlightEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<IQueryTabSlotProps<TFlightEditSchema>, "form" | "isLoading">
> &
	// Manual save only: autosaved pages pass no `onSubmit` and the slot hides its button.
	Pick<IQueryTabSlotProps<TFlightEditSchema>, "onSubmit">;
