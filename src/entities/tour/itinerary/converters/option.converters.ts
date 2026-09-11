import type {
	IOption,
	IOptionFormPayload,
	TTourOptionBackend,
	TTourOptionCreateBackend,
	TTourOptionUpdateBackend
} from "../types";

export const mapOptionToFrontend = (backend: TTourOptionBackend): IOption => ({
	id: backend.id,
	tourMetaId: backend.tour_meta_id,
	name: backend.name ?? "",
	description: backend.description ?? "",
	imageUrl: backend.cover_image_path ?? ""
});

export const mapOptionCreateToBackend = (
	data: IOptionFormPayload
): TTourOptionCreateBackend => ({
	name: data.name,
	description: data.description || null
});

export const mapOptionUpdateToBackend = (
	data: IOptionFormPayload
): TTourOptionUpdateBackend => ({
	name: data.name,
	description: data.description || null
});
