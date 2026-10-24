import { createMockId, createMockIdSequence, mockImageUrl } from "@/shared/api";

import type { TLandingPageResponseBackend } from "@/entities/tour/preview-tour/types/preview-tour-backend.types";
import { TOURS_MOCK } from "@/entities/tour/tour/mock/tour.mock";

import type { TLandingImageBackend, TLandingPageUpdateBackend } from "../types";

import { TOUR_LANDING_MOCK } from "./landing.mock";

const createLanding = (
	landingId: string,
	title: string | null
): TLandingPageResponseBackend => ({
	...structuredClone(TOUR_LANDING_MOCK),
	id: landingId,
	title,
	created_at: null,
	updated_at: null
});

/** tourId → лендинг; id лендинга — landing_id тура */
const createLandingStore = () =>
	new Map(
		TOURS_MOCK.map((tour, index) => [
			tour.id,
			createLanding(
				tour.landing_id ?? createMockId("b120", index),
				tour.title
			)
		])
	);

const createImageStore = () =>
	new Map<string, TLandingImageBackend[]>(
		TOURS_MOCK.map((tour, index) => {
			const landingId = tour.landing_id ?? createMockId("b120", index);
			return [
				tour.id,
				[0, 1, 2].map((imageIndex) => ({
					id: createMockId("b600", index * 10 + imageIndex),
					image_path: mockImageUrl(
						`landing-${index}-${imageIndex}`,
						1200,
						800
					),
					is_primary: imageIndex === 0,
					landing_page_id: landingId
				}))
			];
		})
	);

let landingStore = createLandingStore();
let imageStore = createImageStore();
const landingIds = createMockIdSequence("b120", 1000);
const imageIds = createMockIdSequence("b601", 1);

/** Лендинг тура; для туров, созданных в моке, заводится пустой */
export const getLanding = (tourId: string) => {
	let landing = landingStore.get(tourId);
	if (!landing) {
		landing = {
			...createLanding(landingIds.next(), null),
			overview: null,
			description: null,
			overview_description: null,
			pickup_description: null,
			cancellation_policy: null,
			additional_information: null,
			pickup_type: [],
			amenities_included: [],
			amenities_not_included: []
		};
		landingStore.set(tourId, landing);
	}
	return landing;
};

export const updateLanding = (
	tourId: string,
	update: TLandingPageUpdateBackend
) => {
	const landing = getLanding(tourId);
	for (const [key, value] of Object.entries(update)) {
		if (value !== undefined)
			Object.assign(landing, { [key]: value ?? null });
	}
	landing.updated_at = new Date().toISOString();
	return landing;
};

export const listLandingImages = (tourId: string) =>
	imageStore.get(tourId) ?? [];

export const addLandingImages = (tourId: string, count: number) => {
	const images = listLandingImages(tourId);
	const hadImages = images.length > 0;
	const created = Array.from({ length: Math.max(count, 1) }, (_, index) => {
		const id = imageIds.next();
		return {
			id,
			image_path: mockImageUrl(`landing-image-${id}`, 1200, 800),
			is_primary: !hadImages && index === 0,
			landing_page_id: getLanding(tourId).id
		};
	});
	imageStore.set(tourId, [...images, ...created]);
	return created;
};

export const deleteLandingImage = (tourId: string, imageId: string) => {
	const images = listLandingImages(tourId);
	const next = images.filter((image) => image.id !== imageId);
	if (next.length === images.length) return false;
	if (next.length && !next.some((image) => image.is_primary))
		next[0].is_primary = true;
	imageStore.set(tourId, next);
	return true;
};

export const setPrimaryLandingImage = (tourId: string, imageId: string) => {
	const images = listLandingImages(tourId);
	const image = images.find((item) => item.id === imageId);
	if (!image) return undefined;
	images.forEach((item) => {
		item.is_primary = item.id === imageId;
	});
	return image;
};

export const resetLandingStore = () => {
	landingStore = createLandingStore();
	imageStore = createImageStore();
	landingIds.reset(1000);
	imageIds.reset(1);
};
