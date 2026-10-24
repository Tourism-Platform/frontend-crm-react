import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";
import { languageCodeMapper } from "@/shared/converters";

import { ENUM_LANGUAGES_BACKEND } from "@/entities/tour/landing/types/languages.types";

import {
	ENUM_DETACH_KEEP_BACKEND,
	type IEventProductDetach,
	type IEventProductLink,
	type IEventProductRelink,
	type IEventProductScopeUpdate,
	type TEventProductDetachBackend,
	type TEventProductLinkBackend,
	type TEventProductReadLangQueryBackend,
	type TEventProductRelinkBackend,
	type TEventProductScope,
	type TEventProductScopeBackend,
	type TEventProductScopeBodyBackend
} from "../../../types";

/**
 * Domain scope → API scope. `undefined` (whole product) maps to `{ typ: "all" }`
 * when a scope is required, and is omitted where the body makes it optional.
 */
export const mapEventProductScopeToBackend = (
	scope: TEventProductScope
): TEventProductScopeBackend => {
	if (scope.typ === "only") {
		return {
			typ: "only",
			ids: [...scope.ids],
			units: [...scope.units],
			categories: [...scope.categories]
		};
	}
	return { typ: "all" };
};

export const mapEventProductScopeFromBackend = (
	scope: TEventProductScopeBackend
): TEventProductScope => {
	if (scope.typ === "only") {
		return {
			typ: "only",
			ids: [...(scope.ids ?? [])],
			units: [...(scope.units ?? [])],
			categories: [...(scope.categories ?? [])]
		};
	}
	return { typ: "all" };
};

/** Attach body: `{ product_id, scope? }` — no more `variant_id`. */
export const mapEventProductLinkToBackend = (
	data: IEventProductLink
): TEventProductLinkBackend => ({
	product_id: data.productId,
	...(data.scope ? { scope: mapEventProductScopeToBackend(data.scope) } : {})
});

const DETACH_KEEP_TO_BACKEND = {
	spec: ENUM_DETACH_KEEP_BACKEND.SPEC,
	nothing: ENUM_DETACH_KEEP_BACKEND.NOTHING
} as const;

/** Detach body (required): `{ keep, drop_override? }`. */
export const mapEventProductDetachToBackend = (
	data: IEventProductDetach
): TEventProductDetachBackend => ({
	keep: DETACH_KEEP_TO_BACKEND[data.keep],
	...(data.dropOverride !== undefined
		? { drop_override: data.dropOverride }
		: {})
});

/** Relink body: `{ product_id, scope?, drop_override? }`. */
export const mapEventProductRelinkToBackend = (
	data: IEventProductRelink
): TEventProductRelinkBackend => ({
	product_id: data.productId,
	...(data.scope ? { scope: mapEventProductScopeToBackend(data.scope) } : {}),
	...(data.dropOverride !== undefined
		? { drop_override: data.dropOverride }
		: {})
});

/** Scope-update body: `{ scope, drop_stray_overrides? }`. */
export const mapEventProductScopeUpdateToBackend = (
	data: IEventProductScopeUpdate
): TEventProductScopeBodyBackend => ({
	scope: mapEventProductScopeToBackend(data.scope),
	...(data.dropStrayOverrides !== undefined
		? { drop_stray_overrides: data.dropStrayOverrides }
		: {})
});

/** Always returns an object — no ternary in the RTK service layer. */
export const mapEventReadLangQueryToBackend = (
	language?: ENUM_LANGUAGES_TYPE
): TEventProductReadLangQueryBackend => {
	if (!language) {
		return {};
	}

	return {
		read_lang:
			languageCodeMapper.to(language) ?? ENUM_LANGUAGES_BACKEND.ENGLISH
	};
};
