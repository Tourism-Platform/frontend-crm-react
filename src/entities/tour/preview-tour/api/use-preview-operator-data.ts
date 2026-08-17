import { skipToken } from "@reduxjs/toolkit/query";

import { useOptionalResourceQuery } from "@/shared/hooks";

import type { IPreviewOperator } from "../types";

import {
	useGetDraftPreviewOperatorQuery,
	useGetPreviewOperatorQuery
} from "./preview-tour.service";

interface IUsePreviewOperatorDataArgs {
	tourId: string;
	isDraft: boolean;
}

interface IUsePreviewOperatorDataResult {
	operator?: IPreviewOperator;
	isLoading: boolean;
	isError: boolean;
}

export const usePreviewOperatorData = ({
	tourId,
	isDraft
}: IUsePreviewOperatorDataArgs): IUsePreviewOperatorDataResult => {
	const publicQuery = useGetPreviewOperatorQuery(
		!tourId || isDraft ? skipToken : tourId
	);
	const draftQuery = useGetDraftPreviewOperatorQuery(
		isDraft ? undefined : skipToken
	);

	const query = useOptionalResourceQuery(isDraft ? draftQuery : publicQuery);

	return {
		operator: query.data,
		isLoading: query.isLoading,
		isError: query.isRealError
	};
};
