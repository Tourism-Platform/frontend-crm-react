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
	isDraft
}: IUsePreviewOptionPageDataArgs): IUsePreviewOptionPageDataResult => {
	const skipPublic = !tourId || isDraft;
	const skipDraft = !tourId || !isDraft;

	const publicTour = useGetPreviewTourGeneralQuery(tourId, {
		skip: skipPublic
	});
	const draftTour = useGetDraftPreviewTourGeneralQuery(tourId, {
		skip: skipDraft
	});

	const tourQuery = isDraft ? draftTour : publicTour;

	const optionDetailQuery = usePreviewOptionDetail({
		tourId,
		optionId,
		isDraft,
		skip: !tourId || !optionId
	});

	return {
		tour: tourQuery.data,
		optionDetail: optionDetailQuery.data,
		isLoading: tourQuery.isLoading || optionDetailQuery.isLoading,
		isError: tourQuery.isError || optionDetailQuery.isError
	};
};
