import { useMemo } from "react";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useCurrentLanguage } from "@/shared/hooks";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

import { enrichOptionDetailTitle } from "../converters";
import type { IOptionDetail, IPreviewOptionCard } from "../types";

import {
	useGetDraftPreviewOptionQuery,
	useGetDraftPreviewOptionsQuery,
	useGetPreviewOptionQuery,
	useGetPreviewTourOptionsQuery
} from "./preview-tour.service";

interface IUsePreviewOptionDetailArgs {
	tourId: string;
	optionId: string;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	isDraft?: boolean;
	skip?: boolean;
	optionsList?: IPreviewOptionCard[];
}

export const usePreviewOptionDetail = ({
	tourId,
	optionId,
	currency,
	isDraft = false,
	skip = false,
	optionsList: optionsListProp
}: IUsePreviewOptionDetailArgs) => {
	const shouldSkip = skip || !tourId || !optionId;
	const language = useCurrentLanguage();

	const publicQuery = useGetPreviewOptionQuery(
		{ tourId, optionId, language, currency },
		{ skip: shouldSkip || isDraft }
	);

	const draftQuery = useGetDraftPreviewOptionQuery(
		{ tourId, optionId, language, currency },
		{ skip: shouldSkip || !isDraft }
	);

	const { data: publicOptionsList } = useGetPreviewTourOptionsQuery(
		{
			page: 1,
			limit: INTERSECTION_ELEMENTS.PUBLIC_TOUR_OPTIONS,
			tourId,
			currency
		},
		{ skip: shouldSkip || isDraft || Boolean(optionsListProp) }
	);

	const { data: draftOptionsList } = useGetDraftPreviewOptionsQuery(
		{ tourId, language, currency },
		{
			skip: shouldSkip || !isDraft || Boolean(optionsListProp)
		}
	);

	const query = isDraft ? draftQuery : publicQuery;
	const optionsList =
		optionsListProp ??
		(isDraft ? draftOptionsList : publicOptionsList)?.data;

	const data = useMemo((): IOptionDetail | undefined => {
		if (!query.data) return undefined;

		return enrichOptionDetailTitle(query.data, optionsList, optionId);
	}, [query.data, optionsList, optionId]);

	return {
		...query,
		data
	};
};
