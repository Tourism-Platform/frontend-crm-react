import { LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";

import {
	ENUM_FLIGHT_PRICING,
	ENUM_FORM_FLIGHT_PRODUCT as ENUM_FORM,
	ENUM_FORM_FLIGHT_HOP as ENUM_HOP,
	type IFlightHop,
	type IFlightProduct,
	type TCreateFlightProductBackend,
	type TFlightHopFormSchema,
	type TFlightLegInputBackend,
	type TFlightProductDetailsBackend,
	type TFlightProductGeneralSchema,
	type TUpdateFlightProductBackend
} from "../../types";

import { mapFlightVariantChargeToBackend } from "./product.converters";

const resolveLang = (language?: ENUM_LANGUAGES_TYPE): LanguageCode =>
	languageCodeMapper.to(language) ?? LanguageCode.En;

const emptyToNull = (value: string): string | null => {
	const trimmed = value.trim();
	return trimmed ? trimmed : null;
};

const parseFlightNumber = (value: string): number | null => {
	const trimmed = value.trim();
	if (!trimmed) return null;
	const parsed = Number(trimmed);
	return Number.isFinite(parsed) ? parsed : null;
};

export const emptyHopFormRow = (): TFlightHopFormSchema => ({
	[ENUM_HOP.AIRLINE_CODE]: "",
	[ENUM_HOP.FLIGHT_NUMBER]: "",
	[ENUM_HOP.DEPARTURE_AIRPORT_CODE]: "",
	[ENUM_HOP.ARRIVAL_AIRPORT_CODE]: "",
	[ENUM_HOP.DEPARTURE_LOCATION]: null,
	[ENUM_HOP.ARRIVAL_LOCATION]: null,
	[ENUM_HOP.DEPARTURE_TERMINAL]: "",
	[ENUM_HOP.DEPARTURE_GATE]: ""
});

const mapHopDomainToForm = (hop: IFlightHop): TFlightHopFormSchema => ({
	[ENUM_HOP.AIRLINE_CODE]: hop.airlineCode ?? "",
	[ENUM_HOP.FLIGHT_NUMBER]:
		hop.flightNumber != null ? String(hop.flightNumber) : "",
	[ENUM_HOP.DEPARTURE_AIRPORT_CODE]: hop.departureAirportCode ?? "",
	[ENUM_HOP.ARRIVAL_AIRPORT_CODE]: hop.arrivalAirportCode ?? "",
	[ENUM_HOP.DEPARTURE_LOCATION]: mapBackendLocationToGeoForm(
		hop.departureLocation
	),
	[ENUM_HOP.ARRIVAL_LOCATION]: mapBackendLocationToGeoForm(
		hop.arrivalLocation
	),
	[ENUM_HOP.DEPARTURE_TERMINAL]: hop.departureTerminal ?? "",
	[ENUM_HOP.DEPARTURE_GATE]: hop.departureGate ?? ""
});

export const mapFlightProductToGeneralForm = (
	product?: IFlightProduct | null
): TFlightProductGeneralSchema => ({
	[ENUM_FORM.NAME]: product?.name ?? "",
	[ENUM_FORM.HOPS]: product?.hops?.length
		? product.hops.map(mapHopDomainToForm)
		: [emptyHopFormRow()]
});

const mapHopFormToBackend = (
	hop: TFlightHopFormSchema,
	lang: LanguageCode
): TFlightLegInputBackend => ({
	airline_code:
		emptyToNull(hop[ENUM_HOP.AIRLINE_CODE] ?? "")?.toUpperCase() ?? null,
	flight_number: parseFlightNumber(hop[ENUM_HOP.FLIGHT_NUMBER] ?? ""),
	departure_airport_code:
		emptyToNull(
			hop[ENUM_HOP.DEPARTURE_AIRPORT_CODE] ?? ""
		)?.toUpperCase() ?? null,
	arrival_airport_code:
		emptyToNull(hop[ENUM_HOP.ARRIVAL_AIRPORT_CODE] ?? "")?.toUpperCase() ??
		null,
	departure_location: mapGeoFormToBackendLocation(
		hop[ENUM_HOP.DEPARTURE_LOCATION],
		lang
	),
	arrival_location: mapGeoFormToBackendLocation(
		hop[ENUM_HOP.ARRIVAL_LOCATION],
		lang
	),
	departure_terminal: emptyToNull(hop[ENUM_HOP.DEPARTURE_TERMINAL] ?? ""),
	departure_gate: emptyToNull(hop[ENUM_HOP.DEPARTURE_GATE] ?? "")
});

const mapGeneralFormToDetails = (
	values: TFlightProductGeneralSchema,
	existing: IFlightProduct | null | undefined,
	language?: ENUM_LANGUAGES_TYPE
): TFlightProductDetailsBackend => {
	const lang = resolveLang(language);
	const base = {
		name: values[ENUM_FORM.NAME],
		legs: values[ENUM_FORM.HOPS].map((hop) =>
			mapHopFormToBackend(hop, lang)
		)
	};

	if (existing?.pricing === ENUM_FLIGHT_PRICING.WHOLE) {
		if (!existing.charge) {
			throw new Error(
				"Cannot update a whole-priced flight route without its charge"
			);
		}
		return {
			...base,
			pricing: ENUM_FLIGHT_PRICING.WHOLE,
			charge: mapFlightVariantChargeToBackend(existing.charge)
		};
	}

	return { ...base, pricing: ENUM_FLIGHT_PRICING.PER_FARE };
};

export const mapFlightProductGeneralToCreate = (
	values: TFlightProductGeneralSchema,
	language?: ENUM_LANGUAGES_TYPE
): TCreateFlightProductBackend => ({
	typ: "flight",
	details: mapGeneralFormToDetails(values, null, language)
});

export const mapFlightProductGeneralToUpdate = (
	values: TFlightProductGeneralSchema,
	existing: IFlightProduct | null | undefined,
	language?: ENUM_LANGUAGES_TYPE
): TUpdateFlightProductBackend => ({
	typ: "flight",
	details: mapGeneralFormToDetails(values, existing, language)
});
