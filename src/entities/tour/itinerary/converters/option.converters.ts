import type { IOption, TTourOptionBackend } from "../types";

export const mapOptionToFrontend = (backend: TTourOptionBackend): IOption => ({
	id: backend.id,
	tourMetaId: backend.tour_meta_id
});
