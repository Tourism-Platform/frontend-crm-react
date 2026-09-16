import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	type TEventOverride,
	useClearOptionOverrideMutation,
	useEventEditIds,
	useResolvedEventOptionId,
	useSetOptionOverrideMutation
} from "@/entities/tour";

/**
 * Unified override mutations (contract 3.1) — set/clear address the option
 * row (`eventId` slot + resolved `eventOptionId`).
 */
export const useEventOverrideMutations = (supplyId?: string) => {
	const { i18n } = useTranslation();
	const { tourId, optionId, eventId } = useEventEditIds();
	const eventOptionId = useResolvedEventOptionId();

	const [setOption, setState] = useSetOptionOverrideMutation();
	const [clearOption, clearState] = useClearOptionOverrideMutation();

	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const set = async (data: TEventOverride) =>
		setOption({
			tourId,
			optionId,
			eventId,
			eventOptionId,
			supplyId: supplyId ?? "",
			data,
			language
		}).unwrap();

	const clear = async () =>
		clearOption({
			tourId,
			optionId,
			eventId,
			eventOptionId,
			supplyId: supplyId ?? "",
			language
		}).unwrap();

	const isLoading = setState.isLoading || clearState.isLoading;

	return { set, clear, isLoading };
};
