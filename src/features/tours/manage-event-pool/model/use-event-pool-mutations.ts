import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	type TAddPoolMemberIntent,
	useAddPoolMemberMutation,
	useEventEditIds,
	useRemovePoolMemberMutation,
	useResolvedEventOptionId,
	useSetPoolMemberMainMutation
} from "@/entities/tour";

export const useEventPoolMutations = () => {
	const { i18n } = useTranslation();
	const { tourId, optionId, eventId } = useEventEditIds();
	const eventOptionId = useResolvedEventOptionId();

	const [addMember, addState] = useAddPoolMemberMutation();
	const [removeMember, removeState] = useRemovePoolMemberMutation();
	const [setMainMember, mainState] = useSetPoolMemberMainMutation();

	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const add = (intent: TAddPoolMemberIntent) =>
		addMember({
			tourId,
			optionId,
			eventId,
			eventOptionId,
			intent,
			language
		}).unwrap();

	const remove = (supplyId: string) =>
		removeMember({
			tourId,
			optionId,
			eventId,
			eventOptionId,
			supplyId,
			language
		}).unwrap();

	const setMain = (supplyId: string) =>
		setMainMember({
			tourId,
			optionId,
			eventId,
			eventOptionId,
			supplyId,
			language
		}).unwrap();

	return {
		add,
		remove,
		setMain,
		isAdding: addState.isLoading,
		isRemoving: removeState.isLoading,
		isSettingMain: mainState.isLoading,
		isLoading:
			addState.isLoading || removeState.isLoading || mainState.isLoading
	};
};
