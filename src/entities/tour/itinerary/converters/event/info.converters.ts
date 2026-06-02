import type { InformationEventSchema } from "@/shared/api";

import {
	type TInfoEditSchema,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

export const mapInfoEventToForm = (
	data: TTourEventBackendResponce
): TInfoEditSchema => {
	const event = data?.event as InformationEventSchema;
	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			description: event?.description || ""
		}
	} as unknown as TInfoEditSchema;
};

export const mapInfoFormToUpdate = (
	frontend: Partial<TInfoEditSchema>
): TTourEventUpdateBackend => {
	const g = frontend?.general;
	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		typ: "7",
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(g?.description && { description: g.description }),
		...(Number.isFinite(frontend.day) && { day: frontend.day })
	} as unknown as TTourEventUpdateBackend;
};
