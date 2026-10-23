import type {
	EventLibraryResponse,
	TourEventLibraryImageModel
} from "@/shared/api";
import {
	createMockId,
	createMockIdSequence,
	matchesQuery,
	mockImageUrl,
	omitKeys
} from "@/shared/api";

import {
	type TEventOptionMock,
	cloneEventOption,
	normalizeEventOption
} from "@/entities/tour/itinerary/mock/event-details.mock";
import { TOUR_EVENTS_MOCK } from "@/entities/tour/itinerary/mock/itinerary.mock";

/** Шаблоны: по одному событию каждого типа из маршрута первой опции */
const LIBRARY_SEED: EventLibraryResponse[] = (() => {
	const seen = new Set<string>();
	const templates: TEventOptionMock[] = [];

	for (const { event } of TOUR_EVENTS_MOCK) {
		if (event.event.typ === "options" || seen.has(event.event.name ?? ""))
			continue;
		seen.add(event.event.name ?? "");
		templates.push(
			omitKeys(event.event, [
				"day",
				"position",
				"is_optional",
				"images"
			] as const) as unknown as TEventOptionMock
		);
		if (templates.length === 10) break;
	}

	return templates.map((template, index) => {
		const imagePath = mockImageUrl(`library-${index}`);
		return {
			id: createMockId("b500", index + 1),
			event: {
				...structuredClone(template),
				id: createMockId("b501", index + 1)
			},
			image_paths: [imagePath],
			primary_image_path: imagePath
		} as EventLibraryResponse;
	});
})();

const createLibraryStore = () =>
	new Map(LIBRARY_SEED.map((item) => [item.id, structuredClone(item)]));
const createImageStore = () =>
	new Map<string, TourEventLibraryImageModel[]>(
		LIBRARY_SEED.map((item, index) => [
			item.id,
			item.image_paths.map((imagePath) => ({
				id: createMockId("b510", index + 1),
				image_path: imagePath,
				is_primary: true,
				library_id: item.id
			}))
		])
	);

let libraryStore = createLibraryStore();
let imageStore = createImageStore();

const libraryIds = createMockIdSequence("b500", LIBRARY_SEED.length + 1);
const imageIds = createMockIdSequence("b511", 1);

export const listLibraryEvents = (q: string | null, types: string[]) =>
	[...libraryStore.values()].filter(
		(item) =>
			(!types.length || types.includes(item.event.typ)) &&
			matchesQuery(q, item.event.name, item.event.description)
	);

export const getLibraryEvent = (libraryId: string) =>
	libraryStore.get(libraryId);

/** Опция-шаблон для копирования в тур */
export const getLibraryTemplate = (libraryId: string) =>
	libraryStore.get(libraryId)?.event as TEventOptionMock | undefined;

const saveLibraryEvent = (
	option: TEventOptionMock,
	libraryId = libraryIds.next()
) => {
	const item = {
		id: libraryId,
		event: option,
		image_paths: [],
		primary_image_path: null
	} as unknown as EventLibraryResponse;
	libraryStore.set(item.id, item);
	imageStore.set(item.id, []);
	return item;
};

export const createLibraryEvent = (body: unknown) =>
	saveLibraryEvent(normalizeEventOption(body));

/** Копия шаблона или опции события тура */
export const copyToLibrary = (option: TEventOptionMock) =>
	saveLibraryEvent(cloneEventOption(option));

export const updateLibraryEvent = (libraryId: string, body: unknown) => {
	const item = libraryStore.get(libraryId);
	if (!item) return undefined;
	item.event = normalizeEventOption(
		body,
		item.event.id
	) as EventLibraryResponse["event"];
	return item;
};

export const deleteLibraryEvent = (libraryId: string) => {
	imageStore.delete(libraryId);
	return libraryStore.delete(libraryId);
};

const syncImages = (item: EventLibraryResponse) => {
	const images = imageStore.get(item.id) ?? [];
	item.image_paths = images.map((image) => image.image_path);
	item.primary_image_path =
		images.find((image) => image.is_primary)?.image_path ?? null;
};

export const listLibraryImages = (libraryId: string) =>
	imageStore.get(libraryId) ?? [];

export const addLibraryImages = (item: EventLibraryResponse, count: number) => {
	const images = imageStore.get(item.id) ?? [];
	const hadImages = images.length > 0;
	const created = Array.from({ length: Math.max(count, 1) }, (_, index) => {
		const id = imageIds.next();
		return {
			id,
			image_path: mockImageUrl(`library-image-${id}`),
			is_primary: !hadImages && index === 0,
			library_id: item.id
		};
	});
	images.push(...created);
	imageStore.set(item.id, images);
	syncImages(item);
	return created;
};

export const deleteLibraryImage = (
	item: EventLibraryResponse,
	imageId: string
) => {
	const images = imageStore.get(item.id) ?? [];
	const next = images.filter((image) => image.id !== imageId);
	if (next.length === images.length) return false;
	if (next.length && !next.some((image) => image.is_primary))
		next[0].is_primary = true;
	imageStore.set(item.id, next);
	syncImages(item);
	return true;
};

export const setPrimaryLibraryImage = (
	item: EventLibraryResponse,
	imageId: string
) => {
	const images = imageStore.get(item.id) ?? [];
	if (!images.some((image) => image.id === imageId)) return false;
	images.forEach((image) => {
		image.is_primary = image.id === imageId;
	});
	syncImages(item);
	return true;
};

export const resetEventLibraryStore = () => {
	libraryStore = createLibraryStore();
	imageStore = createImageStore();
	libraryIds.reset(LIBRARY_SEED.length + 1);
	imageIds.reset(1);
};
