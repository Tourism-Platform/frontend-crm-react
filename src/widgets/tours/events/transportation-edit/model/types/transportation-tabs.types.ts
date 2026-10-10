import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TTransportationEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<IQueryTabSlotProps<TTransportationEditSchema>, "form" | "isLoading">
> &
	// Manual save only: autosaved pages pass no `onSubmit` and the slot hides its button.
	Pick<IQueryTabSlotProps<TTransportationEditSchema>, "onSubmit">;
