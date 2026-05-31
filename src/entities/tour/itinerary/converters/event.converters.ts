import type {
	// LocationInSchema,
	// LocationOutSchema,
	// LocationRefSchema,
	TransferEventSchemaOutput
} from "@/shared/api";

import {
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	type ITourEvent,
	type ITourEventCreate,
	type ITourEventReorder,
	type TTourEvent,
	type TTourEventBackendResponce,
	type TTourEventCreateBackend,
	type TTourEventReorderBackend,
	type TTourEventUpdate,
	type TTourEventUpdateBackend,
	type TTransportationEditSchema
} from "../types";

import { eventTypeMapper } from "./event-type.converters";
import { transferTypeMapper } from "./transfer-type.converters";

export const mapAllEventsToFrontend = (
	backend: TTourEventBackendResponce
): ITourEvent => ({
	id: backend.id,
	tourOptionId: backend.tour_option_id,
	name: backend.event.name || "",
	description: backend.event.description || "",
	day: backend.event.day,
	position: backend.event.position,
	eventType:
		eventTypeMapper.from(backend.event.typ as string) ||
		ENUM_EVENT.TOUR_DETAILS,
	details: backend.event.details as Record<string, unknown>
});

// export const mapAllEventsToFrontend = (backend: TTourEventBackend): ITourEvent => ({
// 	id: backend.id,
// 	tourOptionId: backend.tour_option_id,
// 	name: backend.event.name,
// 	description: backend.event.description,
// 	day: backend.event.day,
// 	position: backend.event.position,
// 	eventType:
// 		eventTypeMapper.from(backend.event.typ as string) ||
// 		ENUM_EVENT.TOUR_DETAILS,
// 	details: backend.event.details as Record<string, unknown>
// });

export const mapEventToFrontend = (
	backend: TTourEventBackendResponce
): TTourEvent => {
	switch (backend?.event?.typ) {
		case "4":
			return mapTransferEventToForm(backend);

		default:
			return backend as unknown as TTransportationEditSchema;
	}
};

export const mapEventUpdateToBackend = (
	type: ENUM_EVENT_TYPE,
	frontend: TTourEventUpdate
): TTourEventUpdateBackend => {
	if (type === ENUM_EVENT.TRANSPORTATION)
		return mapTransferFormToUpdate(frontend);

	return {
		name: frontend.name
	} as TTourEventUpdateBackend;
};

export const mapEventReorderToBackend = (
	frontend: ITourEventReorder
): TTourEventReorderBackend => ({
	day: frontend.day,
	position: frontend.position
});

export const mapEventCreateToBackend = (
	frontend: ITourEventCreate
): TTourEventCreateBackend => ({
	name: frontend.name,
	description: frontend.description,
	day: frontend.day,
	position: frontend.position,
	typ: eventTypeMapper.to(frontend.eventType) as any,
	details:
		eventTypeMapper.to(frontend.eventType) !== "8"
			? frontend.details || {}
			: []
});

// const mapTransferEventUpdateToBackend = (
// 	frontend: TTransportationEditSchema
// ): TTourTransportationBackend => ({
// 	name: frontend.general.description.substring(0, 50),
// 	details: {
// 		typ: eventTypeMapper.to(frontend.general.transfer_type),
// 		departure: {
// 			date: frontend.general.departure_date,
// 			time: {
// 				time: frontend.general.departure_time!,
// 				timezone: Number(frontend.general.departure_timezone)
// 			},
// 			location: { name: frontend.general.meet_point }
// 		},
// 		arrival: {
// 			date: frontend.general.arrival_date,
// 			time: {
// 				time: frontend.general.arrival_time!,
// 				timezone: Number(frontend.general.arrival_timezone)
// 			},
// 			location: { name: frontend.general.end_point }
// 		},
// 		expenses: frontend.pricing.total_price
// 	}
// });

// const getLocationName = (
// 	location?: LocationInSchema | LocationRefSchema | LocationOutSchema
// ) => {
// 	if (!location) return "";
// 	if ("name" in location) return location.name;
// 	return "";
// };

export const mapTransferEventToForm = (
	data: TTourEventBackendResponce
): TTransportationEditSchema => {
	const event = data?.event as TransferEventSchemaOutput;

	// const carsList: any[] = [];
	// if (details?.expenses?.typ === "per_car") {
	// 	const perCar = details.expenses as PerCarExpenseOutput;
	// 	perCar.cars.forEach((car) => {
	// 		carsList.push({
	// 			car_name: car.typ || "",
	// 			pax: String(car.pax || 1),
	// 			description: car.description || ""
	// 		});
	// 	});
	// }
	// if (carsList.length === 0) {
	// 	carsList.push({ car_name: "", pax: "1", description: "" });
	// }

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			description: event.description || "",
			transfer_type: transferTypeMapper.from(event?.details?.typ),
			// meet_point: getLocationName(event?.details?.departure?.location?.),
			// end_point: getLocationName(event?.details?.arrival?.location),
			meet_point: "",
			end_point: "",
			departure_date: event?.details?.departure?.date || "",
			arrival_date: event?.details?.departure?.date || "",
			departure_time: event?.details?.departure?.time?.time || null,
			arrival_time: event?.details?.arrival?.time?.time || null,
			departure_timezone: String(
				event?.details?.departure?.time?.timezone ?? ""
			),
			arrival_timezone: String(
				event?.details?.arrival?.time?.timezone ?? ""
			)
		},
		cars: {
			cars: []
		},
		pricing: {
			total_price: 100,
			taxes: 0,
			currency: "USD"
		}
	} as unknown as TTransportationEditSchema;
};

export const mapTransferFormToUpdate = (
	frontend: Partial<TTransportationEditSchema>
): TTourEventUpdateBackend => {
	// const carsExpenses: PerCarExpenseInput = {
	// 	typ: "per_car",
	// 	cars: frontend.cars.cars.map((car) => ({
	// 		typ: car.car_name as any,
	// 		pax: Number(car.pax),
	// 		description: car.description,
	// 		expenses: {
	// 			typ: "fixed",
	// 			cost: {
	// 				val: 0,
	// 				currency: "USD" as Currency
	// 			}
	// 		}
	// 	}))
	// };
	const g = frontend?.general;

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		typ: "4",
		...(Number.isFinite(frontend.position) && {
			position: frontend.position
		}),
		...(Number.isFinite(frontend.day) && { day: frontend.day }),
		details: {
			...(g?.transfer_type && {
				typ: transferTypeMapper.to(g.transfer_type)
			}),
			...((g?.departure_date || g?.departure_time || g?.meet_point) && {
				departure: {
					...(g?.departure_date && { date: g.departure_date }),
					...(g?.departure_time &&
						g?.departure_timezone && {
							time: {
								time: g.departure_time,
								timezone: String(g.departure_timezone)
							}
						}),
					...(g?.meet_point && { location: { name: g.meet_point } })
				}
			}),
			...((g?.arrival_date || g?.arrival_time || g?.end_point) && {
				arrival: {
					...(g?.arrival_date && { date: g.arrival_date }),
					...(g?.arrival_time &&
						g?.arrival_timezone && {
							time: {
								time: g.arrival_time,
								timezone: String(g.arrival_timezone)
							}
						}),
					...(g?.end_point && { location: { name: g.end_point } })
				}
			})
		}
	} as unknown as TTourEventUpdateBackend;
};
