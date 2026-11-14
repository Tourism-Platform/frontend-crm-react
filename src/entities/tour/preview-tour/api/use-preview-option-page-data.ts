import { useCurrentLanguage, useOptionalResourceQuery } from "@/shared/hooks";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type {
	IOptionDetail,
	IPreviewTourData,
	IPreviewTourGeneral
} from "../types";

import {
	useGetDraftPreviewLandingQuery,
	useGetDraftPreviewTourGeneralQuery,
	useGetPreviewTourGeneralQuery,
	useGetPreviewTourQuery
} from "./preview-tour.service";
import { usePreviewOptionDetail } from "./use-preview-option-detail";

interface IUsePreviewOptionPageDataArgs {
	tourId: string;
	optionId: string;
	isDraft: boolean;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
}

interface IUsePreviewOptionPageDataResult {
	tour?: IPreviewTourGeneral;
	/** Лендинг тура — фото для галереи наверху превью варианта; кеш общий с превью тура */
	landing?: IPreviewTourData;
	optionDetail?: IOptionDetail;
	/** Список вариантов ещё грузится — цены за человека (`optionDetail.pricePerPerson`) пока нет */
	isOptionPriceLoading: boolean;
	isLoading: boolean;
	isError: boolean;
}

export const usePreviewOptionPageData = ({
	tourId,
	optionId,
	isDraft,
	currency
}: IUsePreviewOptionPageDataArgs): IUsePreviewOptionPageDataResult => {
	const skipPublic = !tourId || isDraft;
	const skipDraft = !tourId || !isDraft;
	const language = useCurrentLanguage();

	const publicLanding = useGetPreviewTourQuery(
		{ tourId, language },
		{ skip: skipPublic }
	);
	const draftLanding = useGetDraftPreviewLandingQuery(
		{ tourId, language },
		{ skip: skipDraft }
	);

	const publicTour = useGetPreviewTourGeneralQuery(
		{ tourId, language },
		{
			skip: skipPublic
		}
	);
	const draftTour = useGetDraftPreviewTourGeneralQuery(tourId, {
		skip: skipDraft
	});

	const landingQuery = useOptionalResourceQuery(
		isDraft ? draftLanding : publicLanding
	);
	const tourQuery = useOptionalResourceQuery(
		isDraft ? draftTour : publicTour
	);

	const optionDetail = usePreviewOptionDetail({
		tourId,
		optionId,
		currency,
		isDraft,
		skip: !tourId || !optionId
	});
	const optionDetailQuery = useOptionalResourceQuery(optionDetail);

	return {
		tour: tourQuery.data,
		landing: landingQuery.data,
		optionDetail: optionDetailQuery.data,
		isOptionPriceLoading: optionDetail.isOptionsListFetching,
		isLoading:
			landingQuery.isLoading ||
			tourQuery.isLoading ||
			optionDetailQuery.isLoading,
		isError:
			landingQuery.isRealError ||
			tourQuery.isRealError ||
			optionDetailQuery.isRealError
	};
};
