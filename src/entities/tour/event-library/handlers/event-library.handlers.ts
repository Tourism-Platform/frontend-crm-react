import { HttpResponse } from "msw";

import {
	TOUR_EVENT_LIBRARY_PATHS,
	createMockHandler,
	getQueryList,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	readFormFiles,
	toListResponse
} from "@/shared/api";

import { findEventOption } from "@/entities/tour/itinerary/mock/event-details.mock";
import { listTourEvents } from "@/entities/tour/itinerary/mock/itinerary.store";

import {
	addLibraryImages,
	copyToLibrary,
	createLibraryEvent,
	deleteLibraryEvent,
	deleteLibraryImage,
	getLibraryEvent,
	getLibraryTemplate,
	listLibraryEvents,
	listLibraryImages,
	setPrimaryLibraryImage,
	updateLibraryEvent
} from "../mock/event-library.store";
import type { TEventLibraryItemBackend } from "../types";

const LIBRARY_NOT_FOUND = "Library event not found";

const withLibraryEvent = (
	libraryId: unknown,
	resolve: (item: TEventLibraryItemBackend) => Response
) => {
	const item = getLibraryEvent(String(libraryId));
	return item ? resolve(item) : mockNotFound(LIBRARY_NOT_FOUND);
};

/** Опция события тура для копирования в библиотеку */
const findTourEventOption = (optionId: string, eventOptionId: string) => {
	for (const event of listTourEvents(optionId)) {
		const option = findEventOption(event, eventOptionId);
		if (option) return option;
	}
	return undefined;
};

export const eventLibraryHandlers = [
	createMockHandler(TOUR_EVENT_LIBRARY_PATHS.listLibraryEvents, ({ query }) =>
		HttpResponse.json(
			toListResponse(
				listLibraryEvents(query.get("q"), getQueryList(query, "typ")),
				query
			)
		)
	),

	createMockHandler(
		TOUR_EVENT_LIBRARY_PATHS.createLibraryEvent,
		({ body }) =>
			body?.typ
				? HttpResponse.json(createLibraryEvent(body), { status: 201 })
				: mockValidationError(["body", "typ"], "Field required")
	),

	createMockHandler(TOUR_EVENT_LIBRARY_PATHS.copyLibraryEvent, ({ body }) => {
		const source = body?.source;
		const option =
			source?.kind === "library"
				? getLibraryTemplate(source.library_id)
				: source?.kind === "event"
					? findTourEventOption(
							source.option_id,
							source.event_option_id
						)
					: undefined;
		return option
			? HttpResponse.json(copyToLibrary(option), { status: 201 })
			: mockNotFound(LIBRARY_NOT_FOUND);
	}),

	createMockHandler(
		TOUR_EVENT_LIBRARY_PATHS.getLibraryEvent(":libraryId"),
		({ params }) =>
			withLibraryEvent(params.libraryId, (item) =>
				HttpResponse.json(item)
			)
	),

	createMockHandler(
		TOUR_EVENT_LIBRARY_PATHS.updateLibraryEvent(":libraryId"),
		({ params, body }) =>
			withLibraryEvent(params.libraryId, (item) =>
				HttpResponse.json(updateLibraryEvent(item.id, body))
			)
	),

	createMockHandler(
		TOUR_EVENT_LIBRARY_PATHS.deleteLibraryEvent(":libraryId"),
		({ params }) =>
			deleteLibraryEvent(String(params.libraryId))
				? mockNoContent()
				: mockNotFound(LIBRARY_NOT_FOUND)
	),

	createMockHandler(
		TOUR_EVENT_LIBRARY_PATHS.uploadLibraryImages(":libraryId"),
		async ({ params, request }) => {
			const files = await readFormFiles(request);
			return withLibraryEvent(params.libraryId, (item) =>
				HttpResponse.json(addLibraryImages(item, files.length), {
					status: 201
				})
			);
		}
	),

	createMockHandler(
		TOUR_EVENT_LIBRARY_PATHS.listLibraryImages(":libraryId"),
		({ params }) =>
			withLibraryEvent(params.libraryId, (item) =>
				HttpResponse.json(listLibraryImages(item.id))
			)
	),

	createMockHandler(
		TOUR_EVENT_LIBRARY_PATHS.deleteLibraryImage(":libraryId", ":imageId"),
		({ params }) =>
			withLibraryEvent(params.libraryId, (item) =>
				deleteLibraryImage(item, String(params.imageId))
					? mockNoContent()
					: mockNotFound("Image not found")
			)
	),

	createMockHandler(
		TOUR_EVENT_LIBRARY_PATHS.setPrimaryLibraryImage(
			":libraryId",
			":imageId"
		),
		({ params }) =>
			withLibraryEvent(params.libraryId, (item) =>
				setPrimaryLibraryImage(item, String(params.imageId))
					? mockNoContent()
					: mockNotFound("Image not found")
			)
	)
];
