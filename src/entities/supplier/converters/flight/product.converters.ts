import type {
	FixedChargeInput,
	PerPersonChargeInput
} from "@/shared/api/generated/Api";

import {
	ENUM_FLIGHT_PRICING,
	type ENUM_FLIGHT_PRICING_TYPE,
	ENUM_FLIGHT_VARIANT_CHARGE,
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
	type TFlightVariantCharge,
	type TFlightVariantReadBackend,
	type TFlightVariantWriteBackend,
	type TSupplierVariantChargeReadBackend
} from "../../types";
import { hotelAmenityConverter } from "../hotel/amenity.converters";
import {
	mapSupplierFeesFromBackend,
	mapSupplierFeesToBackend
} from "../supplier-fee.converters";
import {
	mapSupplierLocationFromBackend,
	mapSupplierLocationToBackend
} from "../supplier-location.converters";
import {
	mapMonetaryFromBackend,
	mapMonetaryToBackend
} from "../supplier-money.converters";
import {
	mapSupplierChargeMarkupFromBackend,
	mapSupplierChargeMarkupToBackend
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

export const mapFlightVariantChargeToBackend = (
	data: TFlightVariantCharge
): FixedChargeInput | PerPersonChargeInput => {
	const fees = mapSupplierFeesToBackend(data.fees);
	const markup = mapSupplierChargeMarkupToBackend(data.markup);

	if (data.typ === ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON) {
		return {
			typ: "per_person",
			cost_per_person: mapMonetaryToBackend(data.costPerPerson),
			fees,
			markup
		};
	}

	return {
		typ: "fixed",
		cost: mapMonetaryToBackend(data.cost),
		fees,
		markup
	};
};

export const mapFlightVariantChargeFromBackend = (
	charge: TSupplierVariantChargeReadBackend | null | undefined
): TFlightVariantCharge | null => {
	if (!charge) {
		return null;
	}

	const fees = mapSupplierFeesFromBackend(charge.fees);
	const markup = mapSupplierChargeMarkupFromBackend(charge.markup);

	if (charge.typ === "per_person") {
		return {
			typ: ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON,
			costPerPerson: mapMonetaryFromBackend(charge.cost_per_person),
			fees,
			markup
		};
	}

	return {
		typ: ENUM_FLIGHT_VARIANT_CHARGE.FIXED,
		cost: mapMonetaryFromBackend(charge.cost),
		fees,
		markup
	};
};

export const mapFlightVariantFromBackend = (
	variant: TFlightVariantReadBackend
): IFlightVariant => ({
	id: variant.id ?? "",
	name: variant.name ?? "",
	expenses:
		"charge" in variant
			? mapFlightVariantChargeFromBackend(variant.charge)
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
				charge: mapFlightVariantChargeToBackend(data.expenses)
			};

export const mapFlightProductFromBackend = (
	row: TFlightProductReadBackend
): IFlightProduct => {
	const spec = row.spec;

	return {
		id: row.id,
		supplierId: row.supplier_id,
		supplierName: row.supplier_name ?? null,
		typ: ENUM_SUPPLIER_TYPE.FLIGHT,
		name: spec.name ?? row.name,
		pricing: spec.pricing,
		charge:
			spec.pricing === ENUM_FLIGHT_PRICING.WHOLE
				? mapFlightVariantChargeFromBackend(spec.charge)
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
