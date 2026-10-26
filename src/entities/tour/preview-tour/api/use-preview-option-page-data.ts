import { useCurrentLanguage, useOptionalResourceQuery } from "@/shared/hooks";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import type { IOptionDetail, IPreviewTourGeneral } from "../types";

import {
	useGetDraftPreviewTourGeneralQuery,
	useGetPreviewTourGeneralQuery
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
	optionDetail?: IOptionDetail;
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

	const publicTour = useGetPreviewTourGeneralQuery(
		{ tourId, language },
		{
			skip: skipPublic
		}
	);
	const draftTour = useGetDraftPreviewTourGeneralQuery(tourId, {
		skip: skipDraft
	});

	const tourQuery = useOptionalResourceQuery(
		isDraft ? draftTour : publicTour
	);

	const optionDetailQuery = useOptionalResourceQuery(
		usePreviewOptionDetail({
			tourId,
			optionId,
			currency,
			isDraft,
			skip: !tourId || !optionId
		})
	);

	return {
		tour: tourQuery.data,
		optionDetail: optionDetailQuery.data,
		isLoading: tourQuery.isLoading || optionDetailQuery.isLoading,
		isError: tourQuery.isRealError || optionDetailQuery.isRealError
	};
};
