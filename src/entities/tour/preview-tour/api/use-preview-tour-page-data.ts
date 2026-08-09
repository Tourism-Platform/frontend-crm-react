import type {
	IOptionDetail,
	IPreviewOptionCard,
	IPreviewTourData,
	IPreviewTourGeneral
} from "../types";

import {
	useGetDraftPreviewLandingQuery,
	useGetDraftPreviewOptionsQuery,
	useGetDraftPreviewTourGeneralQuery,
	useGetPreviewTourGeneralQuery,
	useGetPreviewTourOptionsQuery,
	useGetPreviewTourQuery
} from "./preview-tour.service";
import { usePreviewOptionDetail } from "./use-preview-option-detail";

interface IUsePreviewTourPageDataArgs {
	tourId: string;
	isDraft: boolean;
}

interface IUsePreviewTourPageDataResult {
	tour?: IPreviewTourGeneral;
	landing?: IPreviewTourData;
	options: IPreviewOptionCard[];
	singleOption?: IPreviewOptionCard;
	optionDetail?: IOptionDetail;
	isLoading: boolean;
	isError: boolean;
	isOptionDetailError: boolean;
}

export const usePreviewTourPageData = ({
	tourId,
	isDraft
}: IUsePreviewTourPageDataArgs): IUsePreviewTourPageDataResult => {
	const skipPublic = !tourId || isDraft;
	const skipDraft = !tourId || !isDraft;

	const publicLanding = useGetPreviewTourQuery(tourId, { skip: skipPublic });
	const draftLanding = useGetDraftPreviewLandingQuery(tourId, {
		skip: skipDraft
	});

	const publicTour = useGetPreviewTourGeneralQuery(tourId, {
		skip: skipPublic
	});
	const draftTour = useGetDraftPreviewTourGeneralQuery(tourId, {
		skip: skipDraft
	});

	const publicOptions = useGetPreviewTourOptionsQuery(tourId, {
		skip: skipPublic
	});
	const draftOptions = useGetDraftPreviewOptionsQuery(tourId, {
		skip: skipDraft
	});

	const landingQuery = isDraft ? draftLanding : publicLanding;
	const tourQuery = isDraft ? draftTour : publicTour;
	const optionsQuery = isDraft ? draftOptions : publicOptions;

	const options = optionsQuery.data ?? [];
	const singleOption = options.length === 1 ? options[0] : undefined;

	const optionDetailQuery = usePreviewOptionDetail({
		tourId,
		optionId: singleOption?.id ?? "",
		isDraft,
		skip: !singleOption,
		optionsList: options
	});

	return {
		tour: tourQuery.data,
		landing: landingQuery.data,
		options,
		singleOption,
		optionDetail: optionDetailQuery.data,
		isLoading:
			landingQuery.isLoading ||
			tourQuery.isLoading ||
			optionsQuery.isLoading ||
			(Boolean(singleOption) && optionDetailQuery.isLoading),
		isError:
			landingQuery.isError || tourQuery.isError || optionsQuery.isError,
		isOptionDetailError: Boolean(singleOption) && optionDetailQuery.isError
	};
};
