import { useMemo } from "react";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useCurrentLanguage, useOptionalResourceQuery } from "@/shared/hooks";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

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
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
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
	isDraft,
	currency
}: IUsePreviewTourPageDataArgs): IUsePreviewTourPageDataResult => {
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

	const publicOptions = useGetPreviewTourOptionsQuery(
		{
			page: 1,
			limit: INTERSECTION_ELEMENTS.PUBLIC_TOUR_OPTIONS,
			tourId,
			currency
		},
		{ skip: skipPublic }
	);
	const draftOptions = useGetDraftPreviewOptionsQuery(
		{ tourId, language, currency },
		{
			skip: skipDraft
		}
	);

	const landingQuery = useOptionalResourceQuery(
		isDraft ? draftLanding : publicLanding
	);
	const tourQuery = useOptionalResourceQuery(
		isDraft ? draftTour : publicTour
	);
	const optionsQuery = useOptionalResourceQuery(
		isDraft ? draftOptions : publicOptions
	);

	const options = useMemo(
		() => optionsQuery.data?.data ?? [],
		[optionsQuery.data]
	);
	const singleOption = options.length === 1 ? options[0] : undefined;

	const optionDetailQuery = useOptionalResourceQuery(
		usePreviewOptionDetail({
			tourId,
			optionId: singleOption?.id ?? "",
			currency,
			isDraft,
			skip: !singleOption,
			optionsList: options
		})
	);

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
			landingQuery.isRealError ||
			tourQuery.isRealError ||
			optionsQuery.isRealError,
		isOptionDetailError:
			Boolean(singleOption) && optionDetailQuery.isRealError
	};
};
