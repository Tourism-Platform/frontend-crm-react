import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";

import {
	ENUM_EVENT_BACKEND,
	ENUM_FORM_EVENT_PRODUCT,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend,
	type TTransferSingleEventBackend,
	type TTransportationEditSchema
} from "../../types";

import { mapInheritedProductLinkToForm } from "./inherited-housing-form.helpers";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "./package-id.helpers";
import { isInheritedTransferDetails } from "./transfer-details.helpers";
import { transferTypeMapper } from "./transfer-type.converters";
import {
	mapCarsFromBackend,
	mapCarsToBackend
} from "./transportation-cars.converters";
import {
	mapTransportationPricingFromBackend,
	mapTransportationPricingToBackend
} from "./transportation-pricing.converters";

export const mapTransferEventToForm = (
	data: TTourEventBackendResponce
): TTransportationEditSchema => {
	const event = data?.event as TTransferSingleEventBackend;
	const details = event?.details ?? null;

	if (isInheritedTransferDetails(details)) {
		return {
			name: event?.name || "",
			day: event.day,
			position: event.position,
			...mapInheritedProductLinkToForm(details),
			general: {
				description: event.description || "",
				transfer_type: transferTypeMapper.from(details.typ),
				meet_point: mapBackendLocationToGeoForm(
					details.departure?.location
				),
				end_point: mapBackendLocationToGeoForm(
					details.arrival?.location
				),
				departure_time: details.departure?.time?.time || null,
				arrival_time: details.arrival?.time?.time || null,
				departure_timezone: String(
					details.departure?.time?.timezone ?? getDeviceUtcOffset()
				),
				arrival_timezone: String(
					details.arrival?.time?.timezone ?? getDeviceUtcOffset()
				)
			},
			cars: mapCarsFromBackend(),
			pricing: applyEventPackageIdToPricing(
				mapTransportationPricingFromBackend(),
				event.package_id
			)
		};
	}

	const expenses =
		details && "expenses" in details ? details.expenses : undefined;
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
			transfer_type: transferTypeMapper.from(details?.typ),
			meet_point: mapBackendLocationToGeoForm(
				details?.departure?.location
			),
			end_point: mapBackendLocationToGeoForm(details?.arrival?.location),
			departure_time: details?.departure?.time?.time || null,
			arrival_time: details?.arrival?.time?.time || null,
			departure_timezone: String(
				details?.departure?.time?.timezone ?? getDeviceUtcOffset()
			),
			arrival_timezone: String(
				details?.arrival?.time?.timezone ?? getDeviceUtcOffset()
			)
		},
		cars,
		pricing: applyEventPackageIdToPricing(
			mapTransportationPricingFromBackend(details, cars.cars),
			event.package_id
		)
	};
};

export const mapTransferFormToUpdate = (
	frontend: Partial<TTransportationEditSchema>,
	language?: ENUM_LANGUAGES_TYPE
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];

	if (productId) {
		return {
			typ: ENUM_EVENT_BACKEND.TRANSFER,
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(frontend.general?.description !== undefined && {
				description: frontend.general.description
			}),
			details: {
				product_id: productId,
				variant_id: frontend[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID] ?? null
			}
		};
	}

	const g = frontend.general;
	const carsList = frontend?.cars?.cars ?? [];
	const pricingDetails = mapTransportationPricingToBackend(
		frontend?.pricing,
		carsList
	);
	const carsDetails =
		frontend?.cars !== undefined && !pricingDetails.details?.expenses
			? mapCarsToBackend(carsList).details
			: undefined;

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined &&
			g.description !== "" && { description: g.description }),
		typ: ENUM_EVENT_BACKEND.TRANSFER,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
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
						location: mapGeoFormToBackendLocation(
							g.meet_point,
							lang
						)
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
						location: mapGeoFormToBackendLocation(g.end_point, lang)
					})
				}
			}),
			...carsDetails,
			...pricingDetails.details
		}
	} as unknown as TTourEventUpdateBackend;
};
