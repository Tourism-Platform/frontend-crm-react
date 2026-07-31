import { ENUM_PATH, buildRoute } from "@/shared/config";

export const isDraftPreviewPath = (pathname: string): boolean =>
	pathname.includes("/draft-preview");

export const buildPreviewTourPath = (
	tourId: string,
	isDraft: boolean
): string =>
	buildRoute(
		isDraft
			? ENUM_PATH.TOURS.DRAFT_PREVIEW
			: ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR,
		{ tourId }
	);

export const buildPreviewOptionPath = (
	tourId: string,
	optionId: string,
	isDraft: boolean
): string =>
	buildRoute(
		isDraft
			? ENUM_PATH.TOURS.DRAFT_PREVIEW_OPTION
			: ENUM_PATH.TOURS.CATALOG.PREVIEW_OPTION,
		{ tourId, optionId }
	);
