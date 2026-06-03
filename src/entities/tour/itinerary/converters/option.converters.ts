import type {
	TourOptionCreateSchema,
	TourOptionUpdateSchema
} from "@/shared/api";

import type { IOption, IOptionFormPayload, TTourOptionBackend } from "../types";

export const mapOptionToFrontend = (backend: TTourOptionBackend): IOption => ({
	id: backend.id,
	tourMetaId: backend.tour_meta_id,
	name: backend.name ?? "",
	description: backend.description ?? "",
	imageUrl: backend.cover_image_path ?? ""
});

export const mapOptionCreateToBackend = (
	data: IOptionFormPayload
): TourOptionCreateSchema => ({
	name: data.name,
	description: data.description || null
});

export const mapOptionUpdateToBackend = (
	data: IOptionFormPayload
): TourOptionUpdateSchema => ({
	name: data.name,
	description: data.description || null
});
