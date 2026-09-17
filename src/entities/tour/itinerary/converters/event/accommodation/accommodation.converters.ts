import { LanguageCode } from "@/shared/api";
import type { HousingDetailsWrite, Stay } from "@/shared/api";
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
	ENUM_HOUSING_SOURCE,
	type TAccommodationEditSchema,
	type TEventDetailsBackend,
	type THousingSingleEventBackend,
	type THousingSpecInputBackend,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../../types";
import {
	mapEventDetailsReadToWrite,
	replaceSelectedPoolMemberSupply
} from "../common/details-read-to-write.converters";
import { getPoolMember } from "../common/event-pool.helpers";
import {
	mapInheritedHousingProductSnapshotToForm,
	mapInheritedProductLinkToForm
} from "../common/inherited-housing-form.helpers";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "../common/package-id.helpers";
import { toTimezoneOffset } from "../common/timezone.helpers";

import { accommodationAmenityConverter } from "./accommodation-amenity.converters";
import {
	getDefaultAccommodationPricing,
	mapAccommodationPricingFromBackend,
	mapAccommodationPricingToBackend
} from "./accommodation-pricing.converters";
import { mapRoomsFromBackend } from "./accommodation-rooms.converters";
import { isInheritedHousingDetails } from "./housing-details.helpers";

export const mapAccommodationEventToForm = (
	data: TTourEventBackendResponce,
	selectedSupplyId?: string
): TAccommodationEditSchema => {
	const event = data?.event as THousingSingleEventBackend;
	const details = event?.details;
	const plan = details?.plan;

	const member = getPoolMember(details, selectedSupplyId);
	const supplyId = member?.id;

	if (isInheritedHousingDetails(details, supplyId)) {
		const link = mapInheritedProductLinkToForm(member);
		const snapshot = mapInheritedHousingProductSnapshotToForm(
			details,
			supplyId
		);

		return {
			name: event?.name || "",
			day: event.day,
			position: event.position,
			...link,
			general: {
				property: snapshot.property,
				stars: snapshot.stars,
				amenities: snapshot.amenities,
				description: event.description || "",
				length_of_stay: plan?.duration ?? null,
				check_in_time: plan?.check_in?.time || "",
				check_in_timezone: String(
					plan?.check_in?.timezone ?? getDeviceUtcOffset()
				),
				check_out_time: plan?.check_out?.time || "",
				check_out_timezone: String(
					plan?.check_out?.timezone ?? getDeviceUtcOffset()
				)
			},
			rooms: snapshot.rooms,
			pricing: applyEventPackageIdToPricing(
				getDefaultAccommodationPricing(),
				event.package_id
			)
		};
	}

	const spec = member?.spec;
	const rooms = mapRoomsFromBackend(spec);

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: supplyId,
		[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.CUSTOM,
		[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: false,
		general: {
			property: mapBackendLocationToGeoForm(spec?.location),
			stars: spec?.stars ?? null,
			amenities: accommodationAmenityConverter.fromMany(
				spec?.amenities ?? []
			),
			description: event.description || "",
			length_of_stay: plan?.duration ?? null,
			check_in_time: plan?.check_in?.time || "",
			check_in_timezone: String(
				plan?.check_in?.timezone ?? getDeviceUtcOffset()
			),
			check_out_time: plan?.check_out?.time || "",
			check_out_timezone: String(
				plan?.check_out?.timezone ?? getDeviceUtcOffset()
			)
		},
		rooms,
		pricing: applyEventPackageIdToPricing(
			mapAccommodationPricingFromBackend(details, rooms.rooms, supplyId),
			event.package_id
		)
	};
};

const mapStayPlanToBackend = (
	g?: TAccommodationEditSchema["general"]
): Stay => {
	const duration = Number(g?.length_of_stay);

	return {
		...(Number.isFinite(duration) && duration > 0 && { duration }),
		...(g?.check_in_time && {
			check_in: {
				time: g.check_in_time,
				timezone: toTimezoneOffset(g.check_in_timezone)
			}
		}),
		...(g?.check_out_time && {
			check_out: {
				time: g.check_out_time,
				timezone: toTimezoneOffset(g.check_out_timezone)
			}
		})
	};
};

export const mapAccommodationFormToUpdate = (
	frontend: Partial<TAccommodationEditSchema>,
	language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];
	const supplyId = frontend[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID];
	const g = frontend.general;
	const plan = mapStayPlanToBackend(g);

	if (productId) {
		return {
			typ: ENUM_EVENT_BACKEND.HOUSING,
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(g?.description !== undefined &&
				g.description !== "" && { description: g.description }),
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			details: { plan }
		};
	}

	const roomsList = frontend?.rooms?.rooms ?? [];
	const { spec: pricingSpec } = mapAccommodationPricingToBackend(
		frontend?.pricing,
		roomsList
	);
	const mappedAmenities = accommodationAmenityConverter.toMany(
		g?.amenities ?? []
	);
	const amenities = mappedAmenities.length ? mappedAmenities : undefined;

	const spec: THousingSpecInputBackend | undefined = pricingSpec
		? {
				...pricingSpec,
				...(g !== undefined && {
					location: mapGeoFormToBackendLocation(g.property, lang)
				}),
				stars: g?.stars ?? null,
				...(amenities && { amenities })
			}
		: undefined;

	const inlineSupply = spec ? { source: "inline" as const, spec } : undefined;

	const echoed =
		inlineSupply && currentDetails
			? replaceSelectedPoolMemberSupply(
					mapEventDetailsReadToWrite(
						ENUM_EVENT_BACKEND.HOUSING,
						currentDetails
					),
					supplyId,
					inlineSupply
				)
			: undefined;

	const details: HousingDetailsWrite = {
		plan,
		...(inlineSupply && {
			pool: (echoed?.pool ?? [
				{ supply: inlineSupply }
			]) as HousingDetailsWrite["pool"]
		})
	};

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined &&
			g.description !== "" && { description: g.description }),
		typ: ENUM_EVENT_BACKEND.HOUSING,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		details
	};
};
