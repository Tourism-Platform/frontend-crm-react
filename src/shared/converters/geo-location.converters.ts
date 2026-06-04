import type {
	LanguageCode,
	LocationInSchema,
	LocationOutSchema,
	LocationRefSchema
} from "@/shared/api";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";
import { formatGeoFeatureLabel } from "@/shared/utils/geo-display.utils";
import {
	decodeGeoOptionValue,
	encodeGeoOptionValue
} from "@/shared/utils/geo-option.utils";

export { decodeGeoOptionValue, encodeGeoOptionValue };

type TGeoFormLabelParts = Pick<
	TGeoFormValue,
	"name" | "street" | "housenumber" | "city" | "state" | "country"
>;

export const mapGeoFormPartsToLabel = (
	value: TGeoFormLabelParts
): string | null => {
	const parts = [
		value.name,
		[value.street, value.housenumber].filter(Boolean).join(" "),
		value.city,
		value.state,
		value.country
	].filter((part) => part && String(part).trim().length > 0);

	return parts.length > 0 ? parts.join(", ") : null;
};

const withGeoFormLabel = (
	value: Omit<TGeoFormValue, "label">
): TGeoFormValue => ({
	...value,
	label: mapGeoFormPartsToLabel(value)
});

export const hasGeoFormLabel = (value: TGeoFormValue): boolean =>
	Boolean(value.name?.trim() || value.city?.trim() || value.street?.trim());

export const mapGeoFormToLocationIn = (
	value: TGeoFormValue | null | undefined
): LocationInSchema | null =>
	value ? { lat: value.lat, long: value.long } : null;

export const mapGeoFormToBackendLocation = (
	value: TGeoFormValue | null | undefined,
	lang: LanguageCode
): LocationInSchema | LocationOutSchema | null => {
	if (!value) return null;

	if (!hasGeoFormLabel(value)) {
		return mapGeoFormToLocationIn(value);
	}

	const address =
		[value.street, value.housenumber].filter(Boolean).join(" ").trim() ||
		value.name?.trim() ||
		null;

	return {
		lang,
		lat: value.lat,
		long: value.long,
		city: value.city ?? null,
		address
	};
};

const isLocationOut = (location: unknown): location is LocationOutSchema =>
	typeof location === "object" &&
	location !== null &&
	"lat" in location &&
	"long" in location &&
	"lang" in location;

export const mapLocationOutToGeoForm = (
	location: LocationOutSchema
): TGeoFormValue =>
	withGeoFormLabel({
		lat: location.lat,
		long: location.long,
		name: location.address ?? location.city ?? null,
		city: location.city ?? null,
		street: location.address ?? null,
		state: null,
		country: null,
		country_code: null,
		housenumber: null,
		postcode: null
	});

export const mapBackendLocationToGeoForm = (
	location:
		| LocationInSchema
		| LocationRefSchema
		| LocationOutSchema
		| null
		| undefined
): TGeoFormValue | null => {
	if (!location || typeof location !== "object") return null;

	if ("id" in location && !("lat" in location)) return null;

	const raw = location as Record<string, unknown>;
	const lat = Number(raw.lat);
	const long = Number(raw.long);

	if (!Number.isFinite(lat) || !Number.isFinite(long)) return null;

	if (isLocationOut(location)) return mapLocationOutToGeoForm(location);

	return withGeoFormLabel({
		lat,
		long,
		name: typeof raw.name === "string" ? raw.name : null,
		city: typeof raw.city === "string" ? raw.city : null,
		street:
			typeof raw.address === "string"
				? raw.address
				: typeof raw.street === "string"
					? raw.street
					: null,
		housenumber:
			typeof raw.housenumber === "string" ? raw.housenumber : null,
		postcode: typeof raw.postcode === "string" ? raw.postcode : null,
		state: typeof raw.state === "string" ? raw.state : null,
		country: typeof raw.country === "string" ? raw.country : null,
		country_code:
			typeof raw.country_code === "string" ? raw.country_code : null
	});
};

export const mapGeoFormToDisplayLabel = (value: TGeoFormValue): string =>
	value.label ?? "";

export { formatGeoFeatureLabel };

export const isSameGeoLocation = (
	a: TGeoFormValue | null | undefined,
	b: TGeoFormValue | null | undefined
): boolean => Boolean(a && b && a.lat === b.lat && a.long === b.long);
