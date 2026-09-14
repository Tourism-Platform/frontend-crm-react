import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	type IEventProductDetach,
	type IEventProductLink,
	type IEventProductRelink,
	useAttachOptionProductMutation,
	useDetachOptionProductMutation,
	useEventEditIds,
	useRelinkOptionProductMutation,
	useResolvedEventOptionId
} from "@/entities/tour";

/**
 * Unified product-link mutations (contract 3.1) — attach / relink / detach
 * all address the option row (`eventId` slot + resolved `eventOptionId`).
 */
export const useEventProductLinkMutations = () => {
	const { i18n } = useTranslation();
	const { tourId, optionId, eventId } = useEventEditIds();
	const eventOptionId = useResolvedEventOptionId();

	const [attachOption, attachState] = useAttachOptionProductMutation();
	const [relinkOption, relinkState] = useRelinkOptionProductMutation();
	const [detachOption, detachState] = useDetachOptionProductMutation();

	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const attach = async (data: IEventProductLink) =>
		attachOption({
			tourId,
			optionId,
			eventId,
			eventOptionId,
			data,
			language
		}).unwrap();

	const relink = async (data: IEventProductRelink) =>
		relinkOption({
			tourId,
			optionId,
			eventId,
			eventOptionId,
			data,
			language
		}).unwrap();

	const detach = async (data: IEventProductDetach) =>
		detachOption({
			tourId,
			optionId,
			eventId,
			eventOptionId,
			data,
			language
		}).unwrap();

	const isLoading =
		attachState.isLoading || relinkState.isLoading || detachState.isLoading;

	return { attach, relink, detach, isLoading };
};
