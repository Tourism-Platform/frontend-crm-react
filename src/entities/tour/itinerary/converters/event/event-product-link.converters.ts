import { LanguageCode } from "@/shared/api/generated/Api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";
import { languageCodeMapper } from "@/shared/converters";

import type {
	IEventProductLink,
	TEventProductLinkBackend,
	TEventProductReadLangQueryBackend
} from "../../types";

export const mapEventProductLinkToBackend = (
	data: IEventProductLink
): TEventProductLinkBackend => ({
	product_id: data.productId,
	variant_id: data.variantId ?? null
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
