import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	ENUM_EVENT_MODE,
	type IEventProductLink,
	useAttachEventOptionProductMutation,
	useAttachSingleEventProductMutation,
	useDetachEventOptionProductMutation,
	useDetachSingleEventProductMutation,
	useEventEditIds
} from "@/entities/tour";

/**
 * Calls the correct attach/detach mutation for single vs multi.
 * Uses separate hooks — not a ternary PATHS inside one endpoint.
 */
export const useEventProductLinkMutations = () => {
	const { i18n } = useTranslation();
	const { tourId, optionId, eventId, eventOptionId, mode } =
		useEventEditIds();

	const [attachSingle, attachSingleState] =
		useAttachSingleEventProductMutation();
	const [detachSingle, detachSingleState] =
		useDetachSingleEventProductMutation();
	const [attachOption, attachOptionState] =
		useAttachEventOptionProductMutation();
	const [detachOption, detachOptionState] =
		useDetachEventOptionProductMutation();

	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const attach = async (data: IEventProductLink) => {
		if (mode === ENUM_EVENT_MODE.MULTI) {
			return attachOption({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				data,
				language
			}).unwrap();
		}

		return attachSingle({
			tourId,
			optionId,
			eventId,
			data,
			language
		}).unwrap();
	};

	const detach = async () => {
		if (mode === ENUM_EVENT_MODE.MULTI) {
			return detachOption({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				language
			}).unwrap();
		}

		return detachSingle({
			tourId,
			optionId,
			eventId,
			language
		}).unwrap();
	};

	const isLoading =
		attachSingleState.isLoading ||
		detachSingleState.isLoading ||
		attachOptionState.isLoading ||
		detachOptionState.isLoading;

	return { attach, detach, isLoading };
};
