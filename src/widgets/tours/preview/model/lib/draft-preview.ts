import { ENUM_PATH, type TPreviewTourQuery, buildRoute } from "@/shared/config";

export const isDraftPreviewPath = (pathname: string): boolean =>
	pathname.includes("/draft-preview");

export const buildPreviewTourPath = (
	tourId: string,
	isDraft: boolean,
	query?: TPreviewTourQuery
): string =>
	buildRoute(
		isDraft
			? ENUM_PATH.TOURS.DRAFT_PREVIEW
			: ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR,
		{ tourId },
		query
	);

export const buildPreviewOptionPath = (
	tourId: string,
	optionId: string,
	isDraft: boolean,
	query?: TPreviewTourQuery
): string =>
	buildRoute(
		isDraft
			? ENUM_PATH.TOURS.DRAFT_PREVIEW_OPTION
			: ENUM_PATH.TOURS.CATALOG.PREVIEW_OPTION,
		{ tourId, optionId },
		query
	);
