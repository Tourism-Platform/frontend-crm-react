import { ActivityType, LanguageCode } from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import {
	languageCodeMapper,
	mapBackendLocationToGeoForm,
	mapGeoFormToBackendLocation
} from "@/shared/converters";
import { getDeviceUtcOffset } from "@/shared/hooks";

import {
	ENUM_ACTIVITY_TYPE,
	ENUM_EVENT_BACKEND,
	ENUM_FORM_ACTIVITY,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_HOUSING_SOURCE,
	type TActivityDetailsInputBackend,
	type TActivityEditSchema,
	type TActivityFoodOfferingInputBackend,
	type TActivitySingleEventBackend,
	type TActivitySpecBackend,
	type TActivitySpecInputBackend,
	type TEventDetailsBackend,
	type TTimesBackend,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../types";

import { isInheritedActivityDetails } from "./activity-details.helpers";
import {
	mapMenuFromBackend,
	mapMenuToBackend
} from "./activity-menu.converters";
import {
	mapActivityPricingFromBackend,
	mapActivityPricingToBackend
} from "./activity-pricing.converters";
import {
	ACTIVITY_TYPE_TO_GENERAL_SUB_TYP,
	activityTypeMapper
} from "./activity-type.converters";
import { mapInlinePoolWrite } from "./details-read-to-write.converters";
import { getPoolMember } from "./event-pool.helpers";
import { mapInheritedProductLinkToForm } from "./inherited-housing-form.helpers";
import {
	applyEventPackageIdToPricing,
	mapEventPackageIdToBackend
} from "./package-id.helpers";
import { toTimezoneOffset } from "./timezone.helpers";
import { zeroFixedCharge } from "./zero-fixed-charge.helpers";

/**
 * The generated READ union types a general venue's discriminant as
 * `"sightseeing" & GeneralVenueOutputSubTypEnum`, which reduces to
 * `never`; the runtime value is the matching enum member, whose values
 * equal `ActivityType`'s — so the tag flows out without a cast.
 */

/** Generated READ union collapses non-food `sub_typ` to `never`; read via cast. */
const normalizeActivitySpecSubTyp = (
	spec: TActivitySpecBackend | undefined
): ActivityType | undefined => {
	if (!spec) return undefined;
	if (spec.sub_typ === "food") return ActivityType.Food;
	// literal ∩ enum → never; runtime всё ещё ActivityType-строка
	const subTyp: ActivityType = spec.sub_typ;
	return subTyp;
};

export const mapActivityEventToForm = (
	data: TTourEventBackendResponce,
	selectedSupplyId?: string
): TActivityEditSchema => {
	const event = data?.event as TActivitySingleEventBackend;
	const details = event?.details ?? null;
	const plan = details?.plan;
	const member = getPoolMember(details, selectedSupplyId);
	const spec = member?.spec;
	const supplyId = member?.id;

	const activityTyp = normalizeActivitySpecSubTyp(spec);
	const isFood = spec?.sub_typ === "food";

	if (isInheritedActivityDetails(details, supplyId)) {
		return {
			name: event?.name || "",
			day: event.day,
			position: event.position,
			...mapInheritedProductLinkToForm(member),
			general: {
				description: event.description || "",
				activity_subtype: activityTypeMapper.from(activityTyp),
				activity_start_time: plan?.start_time?.time || "",
				activity_start_timezone: String(
					plan?.start_time?.timezone ?? getDeviceUtcOffset()
				),
				activity_end_time: plan?.end_time?.time || "",
				activity_end_timezone: String(
					plan?.end_time?.timezone ?? getDeviceUtcOffset()
				),
				location: mapBackendLocationToGeoForm(spec?.location),
				[ENUM_FORM_ACTIVITY.MENU]: []
			},
			pricing: applyEventPackageIdToPricing(
				mapActivityPricingFromBackend(),
				event.package_id
			)
		};
	}

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: supplyId,
		[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.CUSTOM,
		[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: false,
		general: {
			description: event.description || "",
			activity_subtype: activityTypeMapper.from(activityTyp),
			activity_start_time: plan?.start_time?.time || "",
			activity_start_timezone: String(
				plan?.start_time?.timezone ?? getDeviceUtcOffset()
			),
			activity_end_time: plan?.end_time?.time || "",
			activity_end_timezone: String(
				plan?.end_time?.timezone ?? getDeviceUtcOffset()
			),
			location: mapBackendLocationToGeoForm(spec?.location),
			// The form shows a single menu — read the first offering's.
			[ENUM_FORM_ACTIVITY.MENU]: isFood
				? mapMenuFromBackend(spec?.offerings?.[0]?.menu ?? null)
				: []
		},
		pricing: applyEventPackageIdToPricing(
			mapActivityPricingFromBackend(details, supplyId),
			event.package_id
		)
	};
};

export const mapActivityFormToUpdate = (
	frontend: Partial<TActivityEditSchema>,
	language?: ENUM_LANGUAGES_TYPE,
	currentDetails?: TEventDetailsBackend
): TTourEventUpdateBackend => {
	const lang = languageCodeMapper.to(language) ?? LanguageCode.En;
	const productId = frontend[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID];
	const g = frontend?.general;

	const plan: TTimesBackend = {
		...(g?.activity_start_time && {
			start_time: {
				time: g.activity_start_time,
				timezone: toTimezoneOffset(g.activity_start_timezone)
			}
		}),
		...(g?.activity_end_time && {
			end_time: {
				time: g.activity_end_time,
				timezone: toTimezoneOffset(g.activity_end_timezone)
			}
		})
	};

	if (productId) {
		// Product-linked visit: the update keeps the link exactly where it
		// is — `supply` is omitted, only the tour's own plan is stated.
		return {
			typ: ENUM_EVENT_BACKEND.ACTIVITY,
			package_id: mapEventPackageIdToBackend(frontend?.pricing),
			...(frontend.name !== undefined &&
				frontend.name !== "" && { name: frontend.name }),
			...(g?.description !== undefined && {
				description: g.description
			}),
			details: { plan }
		};
	}

	const { charge } = mapActivityPricingToBackend(frontend?.pricing);
	const isFood = g?.activity_subtype === ENUM_ACTIVITY_TYPE.FOOD;
	const location =
		g !== undefined
			? mapGeoFormToBackendLocation(g.location, lang)
			: undefined;

	let spec: TActivitySpecInputBackend | undefined;

	if (isFood) {
		const menu = mapMenuToBackend(g?.[ENUM_FORM_ACTIVITY.MENU]);
		const offerings: TActivityFoodOfferingInputBackend[] | undefined =
			charge
				? [{ name: null, charge, ...(menu && { menu }) }]
				: menu
					? [{ name: null, charge: zeroFixedCharge(), menu }]
					: undefined;

		spec = {
			sub_typ: "food",
			...(location !== undefined && { location }),
			...(offerings && { offerings })
		};
	} else if (g?.activity_subtype) {
		const activityType = activityTypeMapper.to(g.activity_subtype);
		const subTyp = activityType
			? ACTIVITY_TYPE_TO_GENERAL_SUB_TYP[activityType]
			: undefined;

		spec = subTyp
			? {
					sub_typ: subTyp as never,
					...(location !== undefined && { location }),
					offerings: charge ? [{ name: null, charge }] : []
				}
			: undefined;
	}

	// No subtype → no spec is constructible (a venue spec requires
	// `sub_typ`), so `supply` is omitted and the backend keeps the current
	// one (a full replace would wipe it).
	const details: TActivityDetailsInputBackend = {
		plan,
		...(spec && {
			pool: mapInlinePoolWrite(
				ENUM_EVENT_BACKEND.ACTIVITY,
				currentDetails,
				frontend[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID],
				{ source: "inline", spec }
			) as TActivityDetailsInputBackend["pool"]
		})
	};

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		...(g?.description !== undefined &&
			g.description !== "" && { description: g.description }),
		typ: ENUM_EVENT_BACKEND.ACTIVITY,
		package_id: mapEventPackageIdToBackend(frontend?.pricing),
		details
	};
};
