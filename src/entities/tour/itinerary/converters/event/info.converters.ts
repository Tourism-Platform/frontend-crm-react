import type { InformationSingleEventOutput } from "@/shared/api";
import { getDeviceUtcOffset } from "@/shared/hooks";

import { ENUM_EVENT_BACKEND } from "../../types";
import {
	type TInfoEditSchema,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

export const mapInfoEventToForm = (
	data: TTourEventBackendResponce
): TInfoEditSchema => {
	const event = data?.event as InformationSingleEventOutput;
	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			description: event?.description || "",
			info_start_time: event.details?.start_time?.time || "",
			info_start_timezone: String(
				event.details?.start_time?.timezone ?? getDeviceUtcOffset()
			),
			info_end_time: event.details?.end_time?.time || "",
			info_end_timezone: String(
				event.details?.end_time?.timezone ?? getDeviceUtcOffset()
			)
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
		typ: ENUM_EVENT_BACKEND.REF,
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(g?.description && { description: g.description }),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		details: {
			...(g?.info_start_time && {
				start_time: {
					time: g.info_start_time,
					timezone: g.info_start_timezone
				}
			}),
			...(g?.info_end_time && {
				end_time: {
					time: g.info_end_time,
					timezone: g.info_end_timezone
				}
			})
		}
	} as unknown as TTourEventUpdateBackend;
};
