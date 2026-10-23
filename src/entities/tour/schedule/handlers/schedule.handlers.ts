import { HttpResponse } from "msw";

import {
	SEASONAL_COMMISSION_PATHS,
	TOUR_PUBLIC_PATHS,
	TOUR_SCHEDULE_PATHS,
	createMockHandler,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	toListResponse
} from "@/shared/api";

import { getTour } from "@/entities/tour/tour/mock/tour.store";

import {
	addExcludedDates,
	addFixedDates,
	addRecurrenceRules,
	getFullSchedule,
	getPublicSchedule,
	listCommissions,
	removeScheduleItems,
	saveCommission,
	setScheduleSeasonal
} from "../mock/schedule.store";

const withTour = (tourId: unknown, resolve: (tourId: string) => Response) =>
	getTour(String(tourId))
		? resolve(String(tourId))
		: mockNotFound("Tour not found");

const removed = (isRemoved: boolean) =>
	isRemoved ? mockNoContent() : mockNotFound("Schedule item not found");

export const scheduleHandlers = [
	createMockHandler(
		TOUR_SCHEDULE_PATHS.getTourSchedule(":tourId"),
		({ params, query }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(
					getFullSchedule(tourId, query.get("from"), query.get("to"))
				)
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.updateTourSchedule(":tourId"),
		({ params, body, query }) =>
			withTour(params.tourId, (tourId) => {
				if (typeof body.is_seasonal === "boolean") {
					setScheduleSeasonal(tourId, body.is_seasonal);
				}
				return HttpResponse.json(
					getFullSchedule(tourId, query.get("from"), query.get("to"))
				);
			})
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.addFixedDate(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				body.value
					? HttpResponse.json(
							addFixedDates(tourId, [body.value])[0],
							{ status: 201 }
						)
					: mockValidationError(["body", "value"], "Field required")
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.bulkAddFixedDates(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(addFixedDates(tourId, body.dates ?? []), {
					status: 201
				})
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.bulkRemoveFixedDates(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) => {
				removeScheduleItems(tourId, "fixed_dates", body.date_ids ?? []);
				return mockNoContent();
			})
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.removeFixedDate(":tourId", ":dateId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				removed(
					removeScheduleItems(tourId, "fixed_dates", [
						String(params.dateId)
					])
				)
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.addExcludedDate(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				body.value
					? HttpResponse.json(
							addExcludedDates(tourId, [body.value])[0],
							{
								status: 201
							}
						)
					: mockValidationError(["body", "value"], "Field required")
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.bulkAddExcludedDates(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(addExcludedDates(tourId, body.dates ?? []), {
					status: 201
				})
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.bulkRemoveExcludedDates(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) => {
				removeScheduleItems(
					tourId,
					"excluded_dates",
					body.date_ids ?? []
				);
				return mockNoContent();
			})
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.removeExcludedDate(":tourId", ":dateId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				removed(
					removeScheduleItems(tourId, "excluded_dates", [
						String(params.dateId)
					])
				)
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.addRecurrenceRule(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(addRecurrenceRules(tourId, [body])[0], {
					status: 201
				})
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.bulkAddRecurrenceRules(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(
					addRecurrenceRules(tourId, body.rules ?? []),
					{
						status: 201
					}
				)
			)
	),

	createMockHandler(
		TOUR_SCHEDULE_PATHS.removeRecurrenceRule(":tourId", ":ruleId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				removed(
					removeScheduleItems(tourId, "recurrence_rules", [
						String(params.ruleId)
					])
				)
			)
	),

	createMockHandler(
		TOUR_PUBLIC_PATHS.getPublicTourSchedule(":tourId"),
		({ params, query }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(
					getPublicSchedule(
						tourId,
						query.get("from"),
						query.get("to")
					)
				)
			)
	),

	createMockHandler(
		SEASONAL_COMMISSION_PATHS.getTourCommissions(":tourId"),
		({ params, query }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(
					toListResponse(listCommissions(tourId), query, 100).data
				)
			)
	),

	createMockHandler(
		SEASONAL_COMMISSION_PATHS.createTourSeasonCommission(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				body.valid_from && body.valid_until
					? HttpResponse.json(saveCommission(tourId, body), {
							status: 201
						})
					: mockValidationError(
							["body", "valid_from"],
							"Field required"
						)
			)
	),

	createMockHandler(
		SEASONAL_COMMISSION_PATHS.updateTourCommissions(
			":tourId",
			":commissionId"
		),
		({ params, body }) =>
			withTour(params.tourId, (tourId) => {
				const commission = saveCommission(
					tourId,
					body,
					String(params.commissionId)
				);
				return commission
					? HttpResponse.json(commission)
					: mockNotFound("Commission not found");
			})
	),

	createMockHandler(
		SEASONAL_COMMISSION_PATHS.removeCommission(":tourId", ":commissionId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				removed(
					removeScheduleItems(tourId, "commissions", [
						String(params.commissionId)
					])
				)
			)
	)
];
