import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TAccommodationEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<IQueryTabSlotProps<TAccommodationEditSchema>, "form" | "isLoading">
> &
	// Manual save only: autosaved pages pass no `onSubmit` and the slot hides its button.
	Pick<IQueryTabSlotProps<TAccommodationEditSchema>, "onSubmit">;
