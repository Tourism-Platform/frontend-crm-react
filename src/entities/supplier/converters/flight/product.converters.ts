import {
	ENUM_FLIGHT_PRICING,
	type ENUM_FLIGHT_PRICING_TYPE,
	ENUM_SUPPLIER_TYPE,
	type IFlightHop,
	type IFlightProduct,
	type IFlightProductCreate,
	type IFlightVariant,
	type IFlightVariantWrite,
	type TCreateFlightProductBackend,
	type TFlightLegInputBackend,
	type TFlightLegReadBackend,
	type TFlightProductReadBackend,
	type TFlightVariantReadBackend,
	type TFlightVariantWriteBackend
} from "../../types";
import { hotelAmenityConverter } from "../hotel/amenity.converters";
import {
	mapSupplierLocationFromBackend,
	mapSupplierLocationToBackend
} from "../supplier-location.converters";
import {
	mapSupplierVariantChargeFromBackend,
	mapSupplierVariantChargeToBackend
} from "../supplier-variant-charge.converters";

const emptyToNull = (value: string | null | undefined): string | null => {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
};

export const mapFlightHopToBackend = (
	hop: IFlightHop
): TFlightLegInputBackend => ({
	airline_code: emptyToNull(hop.airlineCode),
	flight_number: hop.flightNumber,
	departure_airport_code: emptyToNull(hop.departureAirportCode),
	arrival_airport_code: emptyToNull(hop.arrivalAirportCode),
	departure_location: mapSupplierLocationToBackend(hop.departureLocation),
	arrival_location: mapSupplierLocationToBackend(hop.arrivalLocation),
	departure_terminal: emptyToNull(hop.departureTerminal),
	departure_gate: emptyToNull(hop.departureGate),
	...(hop.amenities.length
		? { amenities: hotelAmenityConverter.toMany(hop.amenities) }
		: {})
});

export const mapFlightHopFromBackend = (
	leg: TFlightLegReadBackend
): IFlightHop => ({
	airlineCode: leg.airline_code ?? null,
	flightNumber: leg.flight_number ?? null,
	departureAirportCode: leg.departure_airport_code ?? null,
	arrivalAirportCode: leg.arrival_airport_code ?? null,
	departureLocation: mapSupplierLocationFromBackend(
		leg.departure_location ?? null
	),
	arrivalLocation: mapSupplierLocationFromBackend(
		leg.arrival_location ?? null
	),
	departureTerminal: leg.departure_terminal ?? null,
	departureGate: leg.departure_gate ?? null,
	amenities: hotelAmenityConverter.fromMany(leg.amenities ?? [])
});

export const mapFlightVariantFromBackend = (
	variant: TFlightVariantReadBackend
): IFlightVariant => ({
	id: variant.id ?? "",
	name: variant.name ?? "",
	expenses:
		"charge" in variant
			? mapSupplierVariantChargeFromBackend(variant.charge)
			: null
});

export const mapFlightVariantToWrite = (
	data: IFlightVariantWrite,
	pricing: ENUM_FLIGHT_PRICING_TYPE
): TFlightVariantWriteBackend =>
	pricing === ENUM_FLIGHT_PRICING.WHOLE
		? {
				typ: "flight",
				pricing: ENUM_FLIGHT_PRICING.WHOLE,
				name: data.name
			}
		: {
				typ: "flight",
				pricing: ENUM_FLIGHT_PRICING.PER_FARE,
				name: data.name,
				charge: mapSupplierVariantChargeToBackend(data.expenses)
			};

export const mapFlightProductFromBackend = (
	row: TFlightProductReadBackend
): IFlightProduct => {
	const spec = row.spec;

	return {
		id: row.id,
		supplierId: row.supplier_id,
		typ: ENUM_SUPPLIER_TYPE.FLIGHT,
		name: spec.name ?? row.name,
		pricing: spec.pricing,
		charge:
			spec.pricing === ENUM_FLIGHT_PRICING.WHOLE
				? mapSupplierVariantChargeFromBackend(spec.charge)
				: null,
		hops: spec.legs.map(mapFlightHopFromBackend),
		imagePaths: row.image_paths ?? [],
		primaryImagePath: row.primary_image_path ?? null,
		variants: spec.fares.map(mapFlightVariantFromBackend)
	};
};

export const mapFlightProductToCreate = (
	data: IFlightProductCreate
): TCreateFlightProductBackend => ({
	typ: "flight",
	details: {
		pricing: ENUM_FLIGHT_PRICING.PER_FARE,
		name: data.name,
		legs: data.hops.map(mapFlightHopToBackend)
	}
});
