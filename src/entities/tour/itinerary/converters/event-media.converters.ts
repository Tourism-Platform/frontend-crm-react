import type { IEventImage, TEventImageBackend } from "../types";

export const mapEventImageToFrontend = (
	backend: TEventImageBackend
): IEventImage => ({
	id: backend.id,
	imagePath: backend.image_path,
	isPrimary: backend.is_primary
});
