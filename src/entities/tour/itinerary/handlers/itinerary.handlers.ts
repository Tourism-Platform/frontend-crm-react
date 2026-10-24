import { HttpResponse } from "msw";

import {
	TOUR_EVENTS_PATHS,
	TOUR_EVENT_MEDIA_PATHS,
	TOUR_OPTION_PATHS,
	TOUR_PACKAGES_PATHS,
	createMockHandler,
	mockBadRequest,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	readFormFiles
} from "@/shared/api";

import { getLibraryTemplate } from "@/entities/tour/event-library/mock/event-library.store";
import { getTour } from "@/entities/tour/tour/mock/tour.store";

import {
	addEventImages,
	addEventOption,
	addNodeImage,
	addPoolMember,
	copyTourEvent,
	createEventFromTemplate,
	createPackage,
	createTourEvent,
	createTourOption,
	deleteEventImage,
	deleteEventOption,
	deletePackage,
	deleteTourEvent,
	deleteTourOption,
	detachPoolMemberProduct,
	findEventNode,
	findTourEvent,
	getEventRecord,
	getPackage,
	getTourEvent,
	getTourOption,
	linkPoolMemberProduct,
	listEventImages,
	listPackages,
	listTourEvents,
	listTourOptions,
	moveEventToMulti,
	moveOptionToSingle,
	patchProductSupply,
	removePoolMember,
	reorderEventOptions,
	reorderTourEvent,
	retypeEventOption,
	setPoolMemberMain,
	setPrimaryEventImage,
	setTourEventOptional,
	setTourOptionCover,
	updateEventOption,
	updatePackage,
	updatePoolMember,
	updateTourOption
} from "../mock/itinerary.store";
import type { TTourEventBackendResponce } from "../types";

type TParams = Record<string, unknown>;

const OPTION_NOT_FOUND = "Tour option not found";
const EVENT_NOT_FOUND = "Event not found";

const OPTION_ARGS = [":tourId", ":optionId"] as const;
const EVENT_ARGS = [":tourId", ":optionId", ":eventId"] as const;
const EVENT_OPTION_ARGS = [...EVENT_ARGS, ":eventOptionId"] as const;
const POOL_ARGS = [...EVENT_OPTION_ARGS, ":supplyId"] as const;

const withOption = (
	params: TParams,
	resolve: (optionId: string) => Response
) =>
	getTourOption(String(params.tourId), String(params.optionId))
		? resolve(String(params.optionId))
		: mockNotFound(OPTION_NOT_FOUND);

const withEvent = (
	params: TParams,
	resolve: (event: TTourEventBackendResponce) => Response
) => {
	const event = getTourEvent(String(params.optionId), String(params.eventId));
	return event ? resolve(event) : mockNotFound(EVENT_NOT_FOUND);
};

/** Мутация события: undefined из стора — не найдено */
const eventResult = (result: unknown, notFound = EVENT_NOT_FOUND) =>
	result ? HttpResponse.json(result) : mockNotFound(notFound);

/** Хендлер операции над опцией события / участником пула */
const eventMutation = <TBody>(
	endpoint: { url: string; method: string; _types?: { body: TBody } },
	mutate: (
		event: TTourEventBackendResponce,
		params: TParams,
		body: TBody
	) => unknown
) =>
	createMockHandler(endpoint, ({ params, body }) =>
		withEvent(params, (event) => eventResult(mutate(event, params, body)))
	);

const optionHandlers = [
	createMockHandler(
		TOUR_OPTION_PATHS.listAllTourOptions(":tourId"),
		({ params }) =>
			getTour(String(params.tourId))
				? HttpResponse.json(listTourOptions(String(params.tourId)))
				: mockNotFound("Tour not found")
	),

	createMockHandler(
		TOUR_OPTION_PATHS.createTourOption(":tourId"),
		({ params, body }) =>
			getTour(String(params.tourId))
				? HttpResponse.json(
						createTourOption(String(params.tourId), body),
						{
							status: 201
						}
					)
				: mockNotFound("Tour not found")
	),

	createMockHandler(
		TOUR_OPTION_PATHS.updateTourOption(...OPTION_ARGS),
		({ params, body }) =>
			eventResult(
				updateTourOption(
					String(params.tourId),
					String(params.optionId),
					body
				),
				OPTION_NOT_FOUND
			)
	),

	createMockHandler(
		TOUR_OPTION_PATHS.deleteOption(...OPTION_ARGS),
		({ params }) =>
			deleteTourOption(String(params.tourId), String(params.optionId))
				? mockNoContent()
				: mockNotFound(OPTION_NOT_FOUND)
	),

	createMockHandler(
		TOUR_OPTION_PATHS.uploadOptionCover(...OPTION_ARGS),
		({ params }) =>
			eventResult(
				setTourOptionCover(
					String(params.tourId),
					String(params.optionId),
					true
				),
				OPTION_NOT_FOUND
			)
	),

	createMockHandler(
		TOUR_OPTION_PATHS.deleteOptionCover(...OPTION_ARGS),
		({ params }) =>
			setTourOptionCover(
				String(params.tourId),
				String(params.optionId),
				false
			)
				? mockNoContent()
				: mockNotFound(OPTION_NOT_FOUND)
	)
];

const packageHandlers = [
	createMockHandler(
		TOUR_PACKAGES_PATHS.listPackages(...OPTION_ARGS),
		({ params }) =>
			withOption(params, (optionId) =>
				HttpResponse.json(listPackages(optionId))
			)
	),

	createMockHandler(
		TOUR_PACKAGES_PATHS.createPackage(...OPTION_ARGS),
		({ params, body }) =>
			withOption(params, (optionId) =>
				body.name?.trim()
					? HttpResponse.json(createPackage(optionId, body), {
							status: 201
						})
					: mockValidationError(["body", "name"], "Field required")
			)
	),

	createMockHandler(
		TOUR_PACKAGES_PATHS.getPackage(...OPTION_ARGS, ":packageId"),
		({ params }) =>
			eventResult(
				getPackage(String(params.optionId), String(params.packageId)),
				"Package not found"
			)
	),

	createMockHandler(
		TOUR_PACKAGES_PATHS.updatePackage(...OPTION_ARGS, ":packageId"),
		({ params, body }) =>
			eventResult(
				updatePackage(
					String(params.optionId),
					String(params.packageId),
					body
				),
				"Package not found"
			)
	),

	createMockHandler(
		TOUR_PACKAGES_PATHS.deletePackage(...OPTION_ARGS, ":packageId"),
		({ params }) =>
			deletePackage(String(params.optionId), String(params.packageId))
				? mockNoContent()
				: mockNotFound("Package not found")
	)
];

const eventHandlers = [
	createMockHandler(
		TOUR_EVENTS_PATHS.listTourEvents(...OPTION_ARGS),
		({ params }) =>
			withOption(params, (optionId) =>
				HttpResponse.json(listTourEvents(optionId))
			)
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.createEvent(...OPTION_ARGS),
		({ params, body }) =>
			withOption(params, (optionId) =>
				body?.typ
					? HttpResponse.json(
							createTourEvent(
								String(params.tourId),
								optionId,
								body
							),
							{ status: 201 }
						)
					: mockValidationError(["body", "typ"], "Field required")
			)
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.copyEvent(...OPTION_ARGS),
		({ params, body }) =>
			withOption(params, (optionId) => {
				const source = body?.source;
				if (source?.kind === "library") {
					const template = getLibraryTemplate(source.library_id);
					return template
						? HttpResponse.json(
								createEventFromTemplate(
									String(params.tourId),
									optionId,
									template,
									source.day,
									source.position,
									source.is_optional
								),
								{ status: 201 }
							)
						: mockNotFound("Library event not found");
				}
				if (source?.kind !== "event") {
					return mockBadRequest("Unsupported copy source");
				}
				const event = findTourEvent(
					String(params.tourId),
					source.event_id
				);
				return event
					? HttpResponse.json(
							copyTourEvent(
								String(params.tourId),
								optionId,
								event,
								source.day,
								source.position
							),
							{ status: 201 }
						)
					: mockNotFound(EVENT_NOT_FOUND);
			})
	),

	// До getTourEvent: иначе `policy-check` примется за eventId.
	// В моке у поставщиков нет политик — предупреждений и блокеров нет
	createMockHandler(
		TOUR_EVENTS_PATHS.policyCheckOption(...OPTION_ARGS),
		({ params }) => withOption(params, () => HttpResponse.json([]))
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.getTourEvent(...EVENT_ARGS),
		({ params }) => withEvent(params, (event) => HttpResponse.json(event))
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.deleteTourEvent(...EVENT_ARGS),
		({ params }) =>
			deleteTourEvent(String(params.optionId), String(params.eventId))
				? mockNoContent()
				: mockNotFound(EVENT_NOT_FOUND)
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.policyCheckEvent(...EVENT_ARGS),
		({ params }) => withEvent(params, () => HttpResponse.json([]))
	),
	createMockHandler(
		TOUR_EVENTS_PATHS.validateEvent(...EVENT_ARGS),
		({ params }) => withEvent(params, () => HttpResponse.json([]))
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.reorderEvent(...EVENT_ARGS),
		({ params, body }) =>
			eventResult(
				reorderTourEvent(
					String(params.optionId),
					String(params.eventId),
					body.day ?? 1,
					body.position ?? 1
				)
			)
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.setEventOptional(...EVENT_ARGS),
		({ params, body }) =>
			eventResult(
				setTourEventOptional(
					String(params.optionId),
					String(params.eventId),
					Boolean(body.is_optional)
				)
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.reorderEventOptions(...EVENT_ARGS),
		(event, _, body) => reorderEventOptions(event, body.order ?? [])
	),

	eventMutation(
		TOUR_EVENTS_PATHS.addOption(...EVENT_ARGS),
		(event, _, body) => addEventOption(event, body)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.updateOption(...EVENT_OPTION_ARGS),
		(event, params, body) =>
			updateEventOption(event, String(params.eventOptionId), body)
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.deleteOption(...EVENT_OPTION_ARGS),
		({ params }) =>
			withEvent(params, (event) =>
				event.event.typ === "options"
					? eventResult(
							deleteEventOption(
								event,
								String(params.eventOptionId)
							)
						)
					: mockBadRequest("Single event option cannot be deleted")
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.retypeOption(...EVENT_OPTION_ARGS),
		(event, params, body) =>
			retypeEventOption(event, String(params.eventOptionId), body)
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.moveOptionToSingle(...EVENT_OPTION_ARGS),
		({ params, body }) => {
			const record = getEventRecord(
				String(params.optionId),
				String(params.eventId)
			);
			if (!record) return mockNotFound(EVENT_NOT_FOUND);
			return eventResult(
				moveOptionToSingle(
					record,
					String(params.eventOptionId),
					body?.day,
					body?.position
				)
			);
		}
	),

	createMockHandler(
		TOUR_EVENTS_PATHS.moveEventToMulti(...EVENT_ARGS, ":targetEventId"),
		({ params, body }) =>
			eventResult(
				moveEventToMulti(
					String(params.optionId),
					String(params.eventId),
					String(params.targetEventId),
					body?.option_position
				)
			)
	)
];

const poolHandlers = [
	eventMutation(
		TOUR_EVENTS_PATHS.addPoolMember(...EVENT_OPTION_ARGS),
		(event, params, body) =>
			addPoolMember(event, String(params.eventOptionId), body)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.updatePoolMember(...POOL_ARGS),
		(event, params, body) =>
			updatePoolMember(
				event,
				String(params.eventOptionId),
				String(params.supplyId),
				body
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.removePoolMember(...POOL_ARGS),
		(event, params) =>
			removePoolMember(
				event,
				String(params.eventOptionId),
				String(params.supplyId)
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.setPoolMemberMain(...POOL_ARGS),
		(event, params) =>
			setPoolMemberMain(
				event,
				String(params.eventOptionId),
				String(params.supplyId)
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.setPoolMemberOverride(...POOL_ARGS),
		(event, params, body) =>
			patchProductSupply(
				event,
				String(params.eventOptionId),
				String(params.supplyId),
				{ override: body }
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.clearPoolMemberOverride(...POOL_ARGS),
		(event, params) =>
			patchProductSupply(
				event,
				String(params.eventOptionId),
				String(params.supplyId),
				{ override: null }
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.attachPoolMemberProduct(...POOL_ARGS),
		(event, params, body) =>
			body.product_id &&
			linkPoolMemberProduct(
				event,
				String(params.eventOptionId),
				String(params.supplyId),
				body.product_id,
				body.scope
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.relinkPoolMemberProduct(...POOL_ARGS),
		(event, params, body) =>
			body.product_id &&
			linkPoolMemberProduct(
				event,
				String(params.eventOptionId),
				String(params.supplyId),
				body.product_id,
				body.scope
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.scopePoolMemberProduct(...POOL_ARGS),
		(event, params, body) =>
			patchProductSupply(
				event,
				String(params.eventOptionId),
				String(params.supplyId),
				{ scope: body.scope ?? { typ: "all" } }
			)
	),

	eventMutation(
		TOUR_EVENTS_PATHS.detachPoolMemberProduct(...POOL_ARGS),
		(event, params, body) =>
			detachPoolMemberProduct(
				event,
				String(params.eventOptionId),
				String(params.supplyId),
				body.keep !== "nothing"
			)
	)
];

/** Медиа адресуются /tour/{tourId}/event/{eventId} — без опции тура */
const withMediaEvent = (
	params: TParams,
	resolve: (event: TTourEventBackendResponce) => Response
) => {
	const event = findTourEvent(String(params.tourId), String(params.eventId));
	return event ? resolve(event) : mockNotFound(EVENT_NOT_FOUND);
};

const MEDIA_ARGS = [":tourId", ":eventId"] as const;
const NODE_ARGS = [...MEDIA_ARGS, ":nodeId"] as const;

const mediaHandlers = [
	createMockHandler(
		TOUR_EVENT_MEDIA_PATHS.uploadEventImages(...MEDIA_ARGS),
		async ({ params, request }) => {
			const files = await readFormFiles(request);
			return withMediaEvent(params, (event) =>
				HttpResponse.json(addEventImages(event, files.length), {
					status: 201
				})
			);
		}
	),

	createMockHandler(
		TOUR_EVENT_MEDIA_PATHS.listEventImages(...MEDIA_ARGS),
		({ params }) =>
			withMediaEvent(params, (event) =>
				HttpResponse.json(listEventImages(event))
			)
	),

	createMockHandler(
		TOUR_EVENT_MEDIA_PATHS.deleteEventImage(...MEDIA_ARGS, ":imageId"),
		({ params }) =>
			withMediaEvent(params, (event) =>
				deleteEventImage(event, String(params.imageId))
					? mockNoContent()
					: mockNotFound("Image not found")
			)
	),

	createMockHandler(
		TOUR_EVENT_MEDIA_PATHS.updateEventImage(...MEDIA_ARGS, ":imageId"),
		({ params }) =>
			withMediaEvent(params, (event) =>
				setPrimaryEventImage(event, String(params.imageId))
					? mockNoContent()
					: mockNotFound("Image not found")
			)
	),

	createMockHandler(
		TOUR_EVENT_MEDIA_PATHS.uploadEventNodeImages(...NODE_ARGS),
		({ params }) =>
			withMediaEvent(params, (event) => {
				const node = findEventNode(event, String(params.nodeId));
				return node
					? HttpResponse.json([addNodeImage(node)], { status: 201 })
					: mockNotFound("Node not found");
			})
	),

	createMockHandler(
		TOUR_EVENT_MEDIA_PATHS.deleteEventNodeImage(...NODE_ARGS, ":imageId"),
		({ params }) =>
			withMediaEvent(params, (event) => {
				const node = findEventNode(event, String(params.nodeId));
				if (!node) return mockNotFound("Node not found");
				node.images = node.images?.filter(
					(image) => image.id !== params.imageId
				);
				return mockNoContent();
			})
	),

	createMockHandler(
		TOUR_EVENT_MEDIA_PATHS.setPrimaryEventNodeImage(
			...NODE_ARGS,
			":imageId"
		),
		({ params }) =>
			withMediaEvent(params, (event) => {
				const node = findEventNode(event, String(params.nodeId));
				if (!node) return mockNotFound("Node not found");
				node.images?.forEach((image) => {
					image.is_primary = image.id === params.imageId;
				});
				return mockNoContent();
			})
	)
];

export const itineraryHandlers = [
	...optionHandlers,
	...packageHandlers,
	...eventHandlers,
	...poolHandlers,
	...mediaHandlers
];
