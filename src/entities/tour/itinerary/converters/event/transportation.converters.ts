import type { TransferEventSchemaOutput } from "@/shared/api";

import {
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend,
	type TTransportationEditSchema
} from "../../types";
import { transferTypeMapper } from "../transfer-type.converters";

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
