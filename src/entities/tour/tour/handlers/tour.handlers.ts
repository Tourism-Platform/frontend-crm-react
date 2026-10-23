import { HttpResponse } from "msw";

import {
	Currency,
	TOUR_FINANCIAL_PATHS,
	TOUR_PATHS,
	TRANSLATIONS_PATHS,
	type TourListSortField,
	type TourStatisticsResponse,
	TourStatus,
	createMockHandler,
	mockImageUrl,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	toListResponse
} from "@/shared/api";

import {
	createTour,
	deleteTour,
	getAllTours,
	getTour,
	getTourFinancials,
	listTours,
	patchTour,
	saveTourFinancials,
	setTourStatus,
	updateTour
} from "../mock/tour.store";

const TOUR_NOT_FOUND = "Tour not found";

const money = (value: number) => value.toFixed(2);

/** Детерминированная статистика по туру: зависит только от его позиции */
const buildTourStatistics = (tourId: string): TourStatisticsResponse => {
	const seed = getAllTours().findIndex((tour) => tour.id === tourId) + 1;
	const orders = seed * 3;
	const revenue = orders * 1250;
	const cost = orders * 900;

	return {
		total_orders: orders,
		completed: seed,
		in_progress: orders - seed,
		tourists: orders * 4,
		planned_revenue: money(revenue),
		planned_cost: money(cost),
		planned_profit: money(revenue - cost),
		confirmed_revenue: money(revenue * 0.8),
		real_cost: money(cost * 0.75),
		real_profit: money(revenue * 0.8 - cost * 0.75),
		revenue_accrued: money(revenue * 0.6),
		revenue_settled: money(revenue * 0.5),
		receivable: money(revenue * 0.1),
		cost_accrued: money(cost * 0.6),
		cost_settled: money(cost * 0.4),
		payable: money(cost * 0.2),
		settled_profit: money(revenue * 0.5 - cost * 0.4),
		currency: Currency.USD
	};
};

const withTour = (
	tourId: unknown,
	resolve: (tourId: string) => Response
): Response =>
	getTour(String(tourId))
		? resolve(String(tourId))
		: mockNotFound(TOUR_NOT_FOUND);

const statusHandler = (
	endpoint: { url: string; method: string },
	status: TourStatus
) =>
	createMockHandler(endpoint, ({ params }) =>
		withTour(params.tourId, (tourId) =>
			HttpResponse.json(setTourStatus(tourId, status))
		)
	);

export const tourHandlers = [
	createMockHandler(TOUR_PATHS.listTours, ({ query }) =>
		HttpResponse.json(
			toListResponse(
				listTours({
					q: query.get("q"),
					status: query.get("status"),
					typ: query.get("typ"),
					sortBy: query.get("sort_by") as TourListSortField | null,
					desc: query.get("desc") === "true"
				}),
				query
			)
		)
	),

	createMockHandler(TOUR_PATHS.createTour, ({ body }) =>
		body.title?.trim()
			? HttpResponse.json(createTour(body), { status: 201 })
			: mockValidationError(["body", "title"], "Field required")
	),

	createMockHandler(TOUR_PATHS.listOneDayTours, () =>
		HttpResponse.json(
			getAllTours().filter(
				(tour) =>
					tour.days === 1 && tour.status === TourStatus.Published
			)
		)
	),

	createMockHandler(TOUR_PATHS.getTour(":tourId"), ({ params }) =>
		withTour(params.tourId, (tourId) => HttpResponse.json(getTour(tourId)))
	),

	createMockHandler(TOUR_PATHS.updateTour(":tourId"), ({ params, body }) =>
		withTour(params.tourId, (tourId) =>
			HttpResponse.json(updateTour(tourId, body))
		)
	),

	createMockHandler(TOUR_PATHS.deleteTour(":tourId"), ({ params }) =>
		withTour(params.tourId, (tourId) => {
			deleteTour(tourId);
			return mockNoContent();
		})
	),

	// Мок всегда валиден: блокеров публикации нет
	createMockHandler(TOUR_PATHS.validateTour(":tourId"), ({ params }) =>
		withTour(params.tourId, () => HttpResponse.json([]))
	),

	statusHandler(TOUR_PATHS.publishTour(":tourId"), TourStatus.Published),
	statusHandler(TOUR_PATHS.archiveTour(":tourId"), TourStatus.Archived),
	statusHandler(TOUR_PATHS.unarchiveTour(":tourId"), TourStatus.Draft),

	createMockHandler(
		TOUR_PATHS.refreshTourProjection(":tourId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(getTour(tourId))
			)
	),

	createMockHandler(TOUR_PATHS.uploadTourCover(":tourId"), ({ params }) =>
		withTour(params.tourId, (tourId) =>
			HttpResponse.json(
				patchTour(tourId, {
					cover_image_path: mockImageUrl(
						`tour-cover-${tourId}-${Date.now()}`
					)
				})
			)
		)
	),

	createMockHandler(TOUR_PATHS.deleteTourCover(":tourId"), ({ params }) =>
		withTour(params.tourId, (tourId) => {
			patchTour(tourId, { cover_image_path: null });
			return mockNoContent();
		})
	),

	createMockHandler(TOUR_PATHS.getTourStatistics(":tourId"), ({ params }) =>
		withTour(params.tourId, (tourId) =>
			HttpResponse.json(buildTourStatistics(tourId))
		)
	),

	createMockHandler(
		TOUR_FINANCIAL_PATHS.getTourFinancials(":tourId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(getTourFinancials(tourId) ?? null)
			)
	),

	createMockHandler(
		TOUR_FINANCIAL_PATHS.createTourFinancials(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(saveTourFinancials(tourId, body), {
					status: 201
				})
			)
	),

	createMockHandler(
		TOUR_FINANCIAL_PATHS.updateTourFinancials(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(
					saveTourFinancials(tourId, {
						currency_type: body.currency_type ?? undefined,
						markup: body.markup,
						foc: body.foc
					})
				)
			)
	),

	// Переводы в моке не генерируются: сразу «готово»
	createMockHandler(
		TRANSLATIONS_PATHS.regenerateTourTranslations(":tourId"),
		({ params }) => withTour(params.tourId, () => mockNoContent())
	)
];
