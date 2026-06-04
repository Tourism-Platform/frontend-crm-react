import type { TransferEventSchemaOutput } from "@/shared/api";
import { LanguageCode } from "@/shared/api";
import {
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";

import {
	ENUM_TRANSPORTATION_PRICING_INVOICING,
	ENUM_TRANSPORTATION_PRICING_TYPE,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend,
	type TTransportationEditSchema
} from "../../types";

import { transferTypeMapper } from "./transfer-type.converters";
import {
	mapCarsFromBackend,
	mapCarsToBackend
} from "./transportation-cars.converters";
import {
	mapTransportationPricingFromBackend,
	mapTransportationPricingToBackend
} from "./transportation-pricing.converters";

const hasPerCarPricingInPayload = (
	pricing: TTransportationEditSchema["pricing"] | undefined,
	pricingDetails: ReturnType<typeof mapTransportationPricingToBackend>
) =>
	pricing?.invoicing === ENUM_TRANSPORTATION_PRICING_INVOICING.INDIVIDUAL &&
	pricing?.pricing_type === ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR &&
	Boolean(pricingDetails.details?.expenses);

export const mapTransferEventToForm = (
	data: TTourEventBackendResponce
): TTransportationEditSchema => {
	const event = data?.event as TransferEventSchemaOutput;
	const details = event?.details;
	const expenses = details?.expenses;
	const perCarCars = expenses?.typ === "per_car" ? expenses.cars : undefined;
	const perCarCategoryCars =
		expenses?.typ === "per_car_category" ? expenses.cars : undefined;
	const cars = mapCarsFromBackend(perCarCars, perCarCategoryCars);

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			description: event.description || "",
			transfer_type: transferTypeMapper.from(event?.details?.typ),
			meet_point: mapBackendLocationToGeoForm(
				event?.details?.departure?.location
			),
			end_point: mapBackendLocationToGeoForm(
				event?.details?.arrival?.location
			),
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
		cars,
		pricing: mapTransportationPricingFromBackend(details, cars.cars)
	};
};

export const mapTransferFormToUpdate = (
	frontend: Partial<TTransportationEditSchema>,
	lang: LanguageCode = LanguageCode.En
): TTourEventUpdateBackend => {
	const g = frontend?.general;
	const carsList = frontend?.cars?.cars ?? [];
	const pricingDetails = mapTransportationPricingToBackend(
		frontend?.pricing,
		carsList
	);
	const carsDetails =
		frontend?.cars !== undefined &&
		!hasPerCarPricingInPayload(frontend?.pricing, pricingDetails)
			? mapCarsToBackend(carsList).details
			: undefined;

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
			...((g?.departure_date ||
				g?.departure_time ||
				g?.meet_point !== undefined) && {
				departure: {
					...(g?.departure_date && { date: g.departure_date }),
					...(g?.departure_time &&
						g?.departure_timezone && {
							time: {
								time: g.departure_time,
								timezone: String(g.departure_timezone)
							}
						}),
					...(g?.meet_point !== undefined && {
						location: g.meet_point
							? mapGeoFormToBackendLocation(g.meet_point, lang)
							: null
					})
				}
			}),
			...((g?.arrival_date ||
				g?.arrival_time ||
				g?.end_point !== undefined) && {
				arrival: {
					...(g?.arrival_date && { date: g.arrival_date }),
					...(g?.arrival_time &&
						g?.arrival_timezone && {
							time: {
								time: g.arrival_time,
								timezone: String(g.arrival_timezone)
							}
						}),
					...(g?.end_point !== undefined && {
						location: g.end_point
							? mapGeoFormToBackendLocation(g.end_point, lang)
							: null
					})
				}
			}),
			...pricingDetails.details,
			...carsDetails
		}
	} as unknown as TTourEventUpdateBackend;
};
