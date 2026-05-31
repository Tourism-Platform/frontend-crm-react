import type { HousingEventSchemaOutput } from "@/shared/api";

import {
	type TAccommodationEditSchema,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

export const mapAccommodationEventToForm = (
	data: TTourEventBackendResponce
): TAccommodationEditSchema => {
	const event = data?.event as HousingEventSchemaOutput;
	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			description: event.description || "",
			// accommodation: event.property || "",
			length_of_stay: String(event.details?.duration) || "",
			check_in_time: event.details?.check_in?.time || "",
			check_in_timezone: event.details?.check_in?.timezone || "",
			check_out_time: event.details?.check_out?.time || "",
			check_out_timezone: event.details?.check_out?.timezone || ""
		}
	} as unknown as TAccommodationEditSchema;
};

export const mapAccommodationFormToUpdate = (
	frontend: Partial<TAccommodationEditSchema>
): TTourEventUpdateBackend => {
	const g = frontend?.general;
	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		typ: "5",
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		details: {
			...(g?.description && { description: g.description }),
			...(!!g?.length_of_stay && {
				duration: g.length_of_stay
			}),
			...(g?.check_in_time && {
				check_in: {
					time: g.check_in_time,
					timezone: g.check_in_timezone
				}
			}),
			...(g?.check_out_time && {
				check_out: {
					time: g.check_out_time,
					timezone: g.check_out_timezone
				}
			})
		}
	} as unknown as TTourEventUpdateBackend;
};
