import { parseDate } from "@internationalized/date";

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
	};
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
	details: frontend.details || {}
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

	const departureDateRaw = event?.details?.departure?.date;
	const arrivalDateRaw = event?.details?.arrival?.date;

	return {
		name: event?.name || "",
		general: {
			description: event.description || "",
			transfer_type: event?.typ || "",
			// meet_point: getLocationName(event?.details?.departure?.location?.),
			// end_point: getLocationName(event?.details?.arrival?.location),
			meet_point: "",
			end_point: "",
			departure_date: departureDateRaw
				? parseDate(departureDateRaw)
				: null,
			arrival_date: arrivalDateRaw ? parseDate(arrivalDateRaw) : null,
			departure_time: event?.details?.departure?.time?.time || null,
			arrival_time: event?.details?.arrival?.time?.time || null,
			departure_timezone: event?.details?.departure?.time?.timezone ?? "",
			arrival_timezone: event?.details?.arrival?.time?.timezone ?? ""
		},
		cars: {
			cars: []
		},
		pricing: {
			total_price: 100,
			taxes: 0,
			currency: "USD"
		}
	} as TTransportationEditSchema;
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

	return {
		name: frontend.name,
		details: {
			// typ: frontend.general.transfer_type,
			departure: {
				date: frontend?.general?.departure_date
				// time: {
				// 	time: frontend.general.departure_time,
				// 	timezone: String(frontend.general.departure_timezone)
				// },
				// location: { name: frontend.general.meet_point }
			},
			arrival: {
				date: frontend?.general?.arrival_date
				// time: {
				// 	time: frontend.general.arrival_time,
				// 	timezone: String(frontend.general.arrival_timezone)
				// },
				// location: { name: frontend.general.end_point }
			}
			// expenses: carsExpenses
		}
	};
};
