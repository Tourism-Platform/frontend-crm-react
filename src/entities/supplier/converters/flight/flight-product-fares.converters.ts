import {
	ENUM_FORM_FLIGHT_FARES,
	type IFlightVariant,
	type TFlightFareRow
} from "../../types";

export { mapFareRowToVariantWrite } from "../map-fare-row.converters";

export const mapFareRowFromVariant = (
	variant: IFlightVariant
): TFlightFareRow => ({
	[ENUM_FORM_FLIGHT_FARES.VARIANT_ID]: variant.id,
	[ENUM_FORM_FLIGHT_FARES.NAME]: variant.name
});
