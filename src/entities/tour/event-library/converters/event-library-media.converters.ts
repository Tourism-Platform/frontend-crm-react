import type { IEventImage } from "@/entities/tour/itinerary";

import type { TEventLibraryImageBackend } from "../types";

export const mapLibraryImageToFrontend = (
	backend: TEventLibraryImageBackend
): IEventImage => ({
	id: backend.id,
	imagePath: backend.image_path,
	isPrimary: backend.is_primary
});
