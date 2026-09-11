import {
	ENUM_SUPPLIER_TYPE,
	type IFlightHop,
	type IFlightProduct,
	type IFlightProductCreate,
	type IFlightVariant,
	type IFlightVariantWrite,
	type TCreateFlightProductBackend,
	type TFlightHopInputBackend,
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

const mapFlightHopToBackend = (hop: IFlightHop): TFlightHopInputBackend => ({
	airline_code: emptyToNull(hop.airlineCode),
	flight_number: hop.flightNumber,
	departure_airport_code: emptyToNull(hop.departureAirportCode),
	arrival_airport_code: emptyToNull(hop.arrivalAirportCode),
	departure_location: mapSupplierLocationToBackend(hop.departureLocation),
	arrival_location: mapSupplierLocationToBackend(hop.arrivalLocation),
	departure_terminal: emptyToNull(hop.departureTerminal),
	departure_gate: emptyToNull(hop.departureGate),
	amenities: hop.amenities.length
		? hotelAmenityConverter.toMany(hop.amenities)
		: null
});

const mapFlightHopFromBackend = (hop: TFlightHopInputBackend): IFlightHop => ({
	airlineCode: hop.airline_code ?? null,
	flightNumber: hop.flight_number ?? null,
	departureAirportCode: hop.departure_airport_code ?? null,
	arrivalAirportCode: hop.arrival_airport_code ?? null,
	departureLocation: mapSupplierLocationFromBackend(
		hop.departure_location ?? null
	),
	arrivalLocation: mapSupplierLocationFromBackend(
		hop.arrival_location ?? null
	),
	departureTerminal: hop.departure_terminal ?? null,
	departureGate: hop.departure_gate ?? null,
	amenities: hotelAmenityConverter.fromMany(hop.amenities ?? [])
});

export const mapFlightVariantFromBackend = (
	variant: TFlightVariantReadBackend
): IFlightVariant => ({
	id: variant.id,
	name: variant.name,
	expenses: mapSupplierVariantChargeFromBackend(variant.expenses)
});

export const mapFlightVariantToWrite = (
	data: IFlightVariantWrite
): TFlightVariantWriteBackend => ({
	typ: "flight",
	name: data.name,
	details: {
		typ: "flight",
		expenses: data.expenses
			? mapSupplierVariantChargeToBackend(data.expenses)
			: null
	}
});

export const mapFlightProductFromBackend = (
	row: TFlightProductReadBackend
): IFlightProduct => ({
	id: row.id,
	supplierId: row.supplier_id,
	typ: ENUM_SUPPLIER_TYPE.FLIGHT,
	name: row.name,
	hops: (row.hop ?? []).map(mapFlightHopFromBackend),
	imagePaths: row.image_paths ?? [],
	primaryImagePath: row.primary_image_path ?? null,
	variants: (row.variants ?? []).map(mapFlightVariantFromBackend)
});

export const mapFlightProductToCreate = (
	data: IFlightProductCreate
): TCreateFlightProductBackend => ({
	typ: "flight",
	name: data.name,
	details: {
		typ: "flight",
		hop: data.hops.map(mapFlightHopToBackend)
	}
});
