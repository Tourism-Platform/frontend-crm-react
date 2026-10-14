import { useMemo } from "react";

import { useCurrentLanguage } from "@/shared/hooks";

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
	isDraft?: boolean;
	skip?: boolean;
	optionsList?: IPreviewOptionCard[];
}

export const usePreviewOptionDetail = ({
	tourId,
	optionId,
	isDraft = false,
	skip = false,
	optionsList: optionsListProp
}: IUsePreviewOptionDetailArgs) => {
	const shouldSkip = skip || !tourId || !optionId;
	const language = useCurrentLanguage();

	const publicQuery = useGetPreviewOptionQuery(
		{ tourId, optionId, language },
		{ skip: shouldSkip || isDraft }
	);

	const draftQuery = useGetDraftPreviewOptionQuery(
		{ tourId, optionId, language },
		{ skip: shouldSkip || !isDraft }
	);

	const { data: publicOptionsList } = useGetPreviewTourOptionsQuery(tourId, {
		skip: shouldSkip || isDraft || Boolean(optionsListProp)
	});

	const { data: draftOptionsList } = useGetDraftPreviewOptionsQuery(
		{ tourId, language },
		{
			skip: shouldSkip || !isDraft || Boolean(optionsListProp)
		}
	);

	const query = isDraft ? draftQuery : publicQuery;
	const optionsList =
		optionsListProp ?? (isDraft ? draftOptionsList : publicOptionsList);

	const data = useMemo((): IOptionDetail | undefined => {
		if (!query.data) return undefined;

		return enrichOptionDetailTitle(query.data, optionsList, optionId);
	}, [query.data, optionsList, optionId]);

	return {
		...query,
		data
	};
};
