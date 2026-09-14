import { LanguageCode } from "@/shared/api";
import type {
	TransferDetailsWrite,
	TransferLegInput,
	TransferPointInput
} from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";

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
import { toTimezoneOffset } from "./timezone.helpers";
import { isInheritedTransferDetails } from "./transfer-details.helpers";
import { transferTypeMapper } from "./transfer-type.converters";
import { mapCarsFromBackend } from "./transportation-cars.converters";
import {
	mapTransportationPricingFromBackend,
	mapTransportationPricingToBackend
} from "./transportation-pricing.converters";

type TTransferGeneral = TTransportationEditSchema["general"];

export const mapTransferEventToForm = (
	data: TTourEventBackendResponce
): TTransportationEditSchema => {
	const event = data?.event as TTransferSingleEventBackend;
	const details = event?.details ?? null;
	// Contract 3.1: the run (kind, points, hours) is the tour's own `plan`,
	// whoever supplies the fleet.
	const plan = details?.plan;

	if (isInheritedTransferDetails(details)) {
		return {
			name: event?.name || "",
			day: event.day,
			position: event.position,
			...mapInheritedProductLinkToForm(details),
			general: {
				description: event.description || "",
				transfer_type: transferTypeMapper.from(plan?.typ),
				meet_point: mapBackendLocationToGeoForm(
					plan?.departure?.location
				),
				end_point: mapBackendLocationToGeoForm(plan?.arrival?.location),
				departure_time: plan?.departure?.time?.time || null,
				arrival_time: plan?.arrival?.time?.time || null,
				departure_timezone: String(
					plan?.departure?.time?.timezone ?? getDeviceUtcOffset()
				),
				arrival_timezone: String(
					plan?.arrival?.time?.timezone ?? getDeviceUtcOffset()
				)
			},
			cars: mapCarsFromBackend(),
			pricing: applyEventPackageIdToPricing(
				mapTransportationPricingFromBackend(),
				event.package_id
			)
		};
	}

	const cars = mapCarsFromBackend(details?.spec);

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		general: {
			description: event.description || "",
			transfer_type: transferTypeMapper.from(plan?.typ),
			meet_point: mapBackendLocationToGeoForm(plan?.departure?.location),
			end_point: mapBackendLocationToGeoForm(plan?.arrival?.location),
			departure_time: plan?.departure?.time?.time || null,
			arrival_time: plan?.arrival?.time?.time || null,
			departure_timezone: String(
				plan?.departure?.time?.timezone ?? getDeviceUtcOffset()
			),
			arrival_timezone: String(
				plan?.arrival?.time?.timezone ?? getDeviceUtcOffset()
			)
		},
		cars,
		pricing: applyEventPackageIdToPricing(
			mapTransportationPricingFromBackend(details, cars.cars),
			event.package_id
		)
	};
};

const mapPointToBackend = (
	time: string | null | undefined,
	timezone: string | null | undefined,
	location: TGeoFormValue | null | undefined,
	lang: LanguageCode
): TransferPointInput | undefined => {
	if (time == null && location === undefined) {
		return undefined;
	}

	return {
		...(time && {
			time: { time, timezone: toTimezoneOffset(timezone) }
		}),
		...(location !== undefined && {
			location: mapGeoFormToBackendLocation(location, lang)
		})
	};
};

/** The run a transfer makes (3.1 `plan`): kind, departure, arrival. */
const mapTransferLegToBackend = (
	g: TTransferGeneral | undefined,
	lang: LanguageCode
): TransferLegInput => {
	const departure = mapPointToBackend(
		g?.departure_time,
		g?.departure_timezone,
		g?.meet_point,
		lang
	);
	const arrival = mapPointToBackend(
		g?.arrival_time,
		g?.arrival_timezone,
		g?.end_point,
		lang
	);

	return {
		...(g?.transfer_type && {
			typ: transferTypeMapper.to(g.transfer_type)
		}),
		...(departure && { departure }),
		...(arrival && { arrival })
	};
};

export const mapTransferFormToUpdate = (
	frontend: Partial<TTransportationEditSchema>,
	language?: ENUM_LANGUAGES_TYPE
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];
	const g = frontend.general;
	const plan = mapTransferLegToBackend(g, lang);

	if (productId) {
		// Product-linked ride: the update keeps the link exactly where it
		// is — `supply` is omitted, only the tour's own plan is stated.
		return {
			typ: ENUM_EVENT_BACKEND.TRANSFER,
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(g?.description !== undefined && {
				description: g.description
			}),
			details: { plan }
		};
	}

	const carsList = frontend?.cars?.cars ?? [];
	const { spec } = mapTransportationPricingToBackend(
		frontend?.pricing,
		carsList
	);

	// No constructible spec → `supply` is omitted so the backend keeps the
	// current one (a full replace would wipe it).
	const details: TransferDetailsWrite = {
		plan,
		...(spec && { supply: { source: "inline", spec } })
	};

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined &&
			g.description !== "" && { description: g.description }),
		typ: ENUM_EVENT_BACKEND.TRANSFER,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		details
	};
};
