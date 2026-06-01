import type { ActivityEventSchemaOutput } from "@/shared/api";

import {
	type TActivityEditSchema,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

import { activityTypeMapper } from "./activity-type.converters";

export const mapActivityEventToForm = (
	data: TTourEventBackendResponce
): TActivityEditSchema => {
	const event = data?.event as ActivityEventSchemaOutput;
	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			description: event.description || "",
			activity_subtype: activityTypeMapper.from(event?.details?.typ),
			activity_start_time: event.details?.start_time?.time || "",
			activity_start_timezone: String(
				event.details?.start_time?.timezone || ""
			),
			activity_end_time: event.details?.end_time?.time || "",
			activity_end_timezone: String(
				event.details?.end_time?.timezone || ""
			)
		}
	};
};

export const mapActivityFormToUpdate = (
	frontend: Partial<TActivityEditSchema>
): TTourEventUpdateBackend => {
	const g = frontend?.general;
	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		typ: "6",
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		details: {
			...(g?.description && { description: g.description }),
			...(g?.activity_subtype && {
				typ: activityTypeMapper.to(g.activity_subtype)
			}),
			...(g?.activity_start_time && {
				start_time: {
					time: g.activity_start_time,
					timezone: g.activity_start_timezone
				}
			}),
			...(g?.activity_end_time && {
				end_time: {
					time: g.activity_end_time,
					timezone: g.activity_end_timezone
				}
			})
		}
	} as unknown as TTourEventUpdateBackend;
};
