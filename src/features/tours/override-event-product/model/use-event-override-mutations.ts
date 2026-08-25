import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	ENUM_EVENT_MODE,
	type TEventOverride,
	useClearEventOptionOverrideMutation,
	useClearSingleEventOverrideMutation,
	useEventEditIds,
	useSetEventOptionOverrideMutation,
	useSetSingleEventOverrideMutation
} from "@/entities/tour";

export const useEventOverrideMutations = () => {
	const { i18n } = useTranslation();
	const { tourId, optionId, eventId, eventOptionId, mode } =
		useEventEditIds();

	const [setSingle, setSingleState] = useSetSingleEventOverrideMutation();
	const [clearSingle, clearSingleState] =
		useClearSingleEventOverrideMutation();
	const [setOption, setOptionState] = useSetEventOptionOverrideMutation();
	const [clearOption, clearOptionState] =
		useClearEventOptionOverrideMutation();

	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const set = async (data: TEventOverride) => {
		if (mode === ENUM_EVENT_MODE.MULTI) {
			return setOption({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				data,
				language
			}).unwrap();
		}

		return setSingle({
			tourId,
			optionId,
			eventId,
			data,
			language
		}).unwrap();
	};

	const clear = async () => {
		if (mode === ENUM_EVENT_MODE.MULTI) {
			return clearOption({
				tourId,
				optionId,
				eventId,
				eventOptionId,
				language
			}).unwrap();
		}

		return clearSingle({
			tourId,
			optionId,
			eventId,
			language
		}).unwrap();
	};

	const isLoading =
		setSingleState.isLoading ||
		clearSingleState.isLoading ||
		setOptionState.isLoading ||
		clearOptionState.isLoading;

	return { set, clear, isLoading };
};
