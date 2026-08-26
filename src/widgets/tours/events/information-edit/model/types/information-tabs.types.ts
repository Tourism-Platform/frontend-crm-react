import type { IQueryTabSlotProps } from "@/shared/ui";

import type { TInfoEditSchema } from "@/entities/tour";

export type TSlotProps = Required<
	Pick<IQueryTabSlotProps<TInfoEditSchema>, "form" | "onSubmit" | "isLoading">
>;
