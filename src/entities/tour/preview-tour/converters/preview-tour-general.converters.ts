import { languageCodeMapper } from "@/shared/converters";

import type { ENUM_LANGUAGES_BACKEND_TYPE } from "@/entities/tour/landing/types/languages.types";

import type {
	IPreviewTourGeneral,
	TGetPreviewTourBackendResponse
} from "../types";

import { previewTourCategoriesMapper } from "./preview-tour-categories.converters";
import { previewTourStatusMapper } from "./preview-tour-status.converters";
import { previewTourTypeMapper } from "./preview-tour-type.converters";

/** Код языка → код для флага (`EN`), как `mapTourLanguageBadge` в конвертерах каталога и туров */
const mapPreviewTourLanguageBadge = (
	code: ENUM_LANGUAGES_BACKEND_TYPE
): string => (languageCodeMapper.from(code) ?? code).toUpperCase();

export const mapPreviewTourGeneralToFrontend = (
	backend: TGetPreviewTourBackendResponse
): IPreviewTourGeneral => ({
	id: backend.id,
	status: previewTourStatusMapper.from(backend.status)!,
	tourTitle: backend.title ?? "",
	tourType: previewTourTypeMapper.from(backend.typ)!,
	groupSize: backend.group_size,
	groupSizeMin: backend.group_size_min ?? null,
	duration: {
		from: backend.days,
		to: backend.nights
	},
	ageRequires: {
		from: backend.age_from ?? "",
		to: backend.age_to ?? ""
	},
	tourCategories: previewTourCategoriesMapper.fromMany(
		backend.categories ?? []
	),
	languages: (backend.languages ?? []).map(mapPreviewTourLanguageBadge)
});
