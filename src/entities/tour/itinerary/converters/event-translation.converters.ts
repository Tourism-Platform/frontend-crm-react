import { TranslationState } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_EVENT_TRANSLATION,
	type ENUM_EVENT_TRANSLATION_TYPE
} from "../types";

const MAP_EVENT_TRANSLATION: Partial<
	Record<ENUM_EVENT_TRANSLATION_TYPE, TranslationState>
> = {
	[ENUM_EVENT_TRANSLATION.SOURCE]: TranslationState.Source,
	[ENUM_EVENT_TRANSLATION.READY]: TranslationState.Ready,
	[ENUM_EVENT_TRANSLATION.PENDING]: TranslationState.Pending
};

export const eventTranslationMapper = createEnumMapper<
	ENUM_EVENT_TRANSLATION_TYPE,
	TranslationState
>(MAP_EVENT_TRANSLATION);
