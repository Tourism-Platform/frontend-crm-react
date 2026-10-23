import { HttpResponse } from "msw";

import {
	BOOKING_REVISION_PATHS,
	createMockHandler,
	mockNotFound,
	mockValidationError
} from "@/shared/api";

import {
	addRevisionEvent,
	addRevisionPoolMember,
	clearRevisionPoolMemberProduct,
	copyRevisionEvent,
	getRevisionPreview,
	listRevisionEdits,
	removeRevisionEvent,
	removeRevisionPoolMember,
	setRevisionPoolMemberOverride,
	setRevisionPoolMemberProduct,
	updateRevisionEvent
} from "../mock/booking-snapshot.store";

type TParams = Record<string, unknown>;

const previewResult = (preview: unknown) =>
	preview
		? HttpResponse.json(preview)
		: mockNotFound("Booking or event not found");

/** Цель операции над пулом: опция по id или по индексу из query */
const toTarget = (params: TParams, query: URLSearchParams) => {
	const optionIndex = query.get("option_index");
	return {
		bookingId: String(params.bookingId),
		eventId: String(params.eventId),
		eventOptionId: query.get("event_option_id"),
		optionIndex: optionIndex === null ? null : Number(optionIndex)
	};
};

const POOL_ARGS = [":bookingId", ":eventId", ":supplyId"] as const;

export const bookingRevisionHandlers = [
	createMockHandler(
		BOOKING_REVISION_PATHS.preview(":bookingId"),
		({ params }) =>
			previewResult(getRevisionPreview(String(params.bookingId)))
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.listEdits(":bookingId"),
		({ params }) =>
			HttpResponse.json(listRevisionEdits(String(params.bookingId)))
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.addEvent(":bookingId"),
		({ params, body }) =>
			body?.typ
				? previewResult(
						addRevisionEvent(String(params.bookingId), body)
					)
				: mockValidationError(["body", "typ"], "Field required")
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.updateEvent(":bookingId", ":eventId"),
		({ params, body }) =>
			previewResult(
				updateRevisionEvent(
					String(params.bookingId),
					String(params.eventId),
					body
				)
			)
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.removeEvent(":bookingId", ":eventId"),
		({ params }) =>
			previewResult(
				removeRevisionEvent(
					String(params.bookingId),
					String(params.eventId)
				)
			)
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.copyEvent(":bookingId"),
		({ params, body }) =>
			body?.source
				? previewResult(
						copyRevisionEvent(String(params.bookingId), body.source)
					)
				: mockValidationError(["body", "source"], "Field required")
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.addPoolMember(":bookingId", ":eventId"),
		({ params, query, body }) =>
			previewResult(addRevisionPoolMember(toTarget(params, query), body))
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.removePoolMember(...POOL_ARGS),
		({ params, query }) =>
			previewResult(
				removeRevisionPoolMember(
					toTarget(params, query),
					String(params.supplyId)
				)
			)
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.setPoolMemberProduct(...POOL_ARGS),
		({ params, query, body }) =>
			body.product_id
				? previewResult(
						setRevisionPoolMemberProduct(
							toTarget(params, query),
							String(params.supplyId),
							body.product_id,
							body.scope
						)
					)
				: mockValidationError(["body", "product_id"], "Field required")
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.clearPoolMemberProduct(...POOL_ARGS),
		({ params, query }) =>
			previewResult(
				clearRevisionPoolMemberProduct(
					toTarget(params, query),
					String(params.supplyId)
				)
			)
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.setPoolMemberOverride(...POOL_ARGS),
		({ params, query, body }) =>
			previewResult(
				setRevisionPoolMemberOverride(
					toTarget(params, query),
					String(params.supplyId),
					body
				)
			)
	),

	createMockHandler(
		BOOKING_REVISION_PATHS.clearPoolMemberOverride(...POOL_ARGS),
		({ params, query }) =>
			previewResult(
				setRevisionPoolMemberOverride(
					toTarget(params, query),
					String(params.supplyId),
					null
				)
			)
	)
];
