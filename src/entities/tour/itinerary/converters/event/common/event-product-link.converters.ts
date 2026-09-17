import { DetachKeep, LanguageCode } from "@/shared/api/generated/Api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";
import { languageCodeMapper } from "@/shared/converters";

import type {
	IEventProductDetach,
	IEventProductLink,
	IEventProductRelink,
	IEventProductScopeUpdate,
	TEventProductDetachBackend,
	TEventProductLinkBackend,
	TEventProductReadLangQueryBackend,
	TEventProductRelinkBackend,
	TEventProductScope,
	TEventProductScopeBackend,
	TEventProductScopeBodyBackend
} from "../../../types";

/**
 * Domain scope → API scope. `undefined` (whole product) maps to `{ typ: "all" }`
 * when a scope is required, and is omitted where the body makes it optional.
 */
export const mapEventProductScopeToBackend = (
	scope: TEventProductScope
): TEventProductScopeBackend => {
	if (scope.typ === "only") {
		return { typ: "only", ids: [...scope.ids] };
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
	spec: DetachKeep.Spec,
	nothing: DetachKeep.Nothing
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
		read_lang: languageCodeMapper.to(language) ?? LanguageCode.En
	};
};
