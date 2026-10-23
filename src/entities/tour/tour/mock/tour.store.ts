import {
	type CreateFinancialSchema,
	type TourFinSettingsModel,
	type TourListSortField,
	type TourMetaCreateSchema,
	type TourMetaResponse,
	type TourMetaUpdateSchema,
	TourStatus,
	TourType,
	createMockId,
	createMockIdSequence,
	matchesQuery,
	sortBy
} from "@/shared/api";

import {
	MOCK_TOUR_OPERATOR_ID,
	TOURS_MOCK,
	createTourFinancialsMock
} from "./tour.mock";

const createTourStore = () =>
	new Map(TOURS_MOCK.map((tour) => [tour.id, structuredClone(tour)]));
const createFinancialsStore = () =>
	new Map(
		TOURS_MOCK.map((tour, index) => [
			tour.id,
			createTourFinancialsMock(tour.id, index)
		])
	);

let tourStore = createTourStore();
let financialsStore = createFinancialsStore();
const tourIds = createMockIdSequence("b100", TOURS_MOCK.length);

const now = () => new Date().toISOString();

const NON_NULLABLE_FIELDS = new Set([
	"typ",
	"days",
	"nights",
	"group_size",
	"categories",
	"languages"
]);

interface ITourListFilter {
	q: string | null;
	status: string | null;
	typ: string | null;
	sortBy: TourListSortField | null;
	desc: boolean;
}

export const listTours = ({
	q,
	status,
	typ,
	sortBy: field,
	desc
}: ITourListFilter) => {
	const tours = [...tourStore.values()].filter(
		(tour) =>
			matchesQuery(q, tour.title) &&
			(!status || tour.status === status) &&
			(!typ || tour.typ === typ)
	);
	return field
		? sortBy(tours, field, desc)
		: sortBy(tours, "created_at", true);
};

export const getTour = (tourId: string) => tourStore.get(tourId);

export const getAllTours = () => [...tourStore.values()];

export const createTour = (body: TourMetaCreateSchema): TourMetaResponse => {
	const id = tourIds.next();
	const tour: TourMetaResponse = {
		id,
		created_at: now(),
		updated_at: now(),
		operator_id: MOCK_TOUR_OPERATOR_ID,
		schedule_id: createMockId("b110", tourStore.size),
		agency_id: body.agency_id ?? null,
		landing_id: createMockId("b120", tourStore.size),
		title: body.title,
		slug: body.title.toLowerCase().replace(/\W+/g, "-"),
		cover_image_path: null,
		group_size: body.group_size ?? 10,
		group_size_min: body.group_size_min ?? null,
		days: body.days ?? 1,
		nights: body.nights ?? 0,
		duration_hours: body.duration_hours ?? null,
		age_from: body.age_from ?? null,
		age_to: body.age_to ?? null,
		typ: body.typ ?? TourType.Regular,
		status: TourStatus.Draft,
		categories: body.categories ?? [],
		languages: body.languages ?? []
	};
	tourStore.set(id, tour);
	return tour;
};

export const updateTour = (tourId: string, update: TourMetaUpdateSchema) => {
	const tour = tourStore.get(tourId);
	if (!tour) return undefined;

	for (const [key, value] of Object.entries(update)) {
		// null в PATCH для ненулевых полей значит «не менять»
		if (value === undefined) continue;
		if (value === null && NON_NULLABLE_FIELDS.has(key)) continue;
		Object.assign(tour, { [key]: value });
	}
	tour.updated_at = now();
	return tour;
};

export const patchTour = (tourId: string, patch: Partial<TourMetaResponse>) => {
	const tour = tourStore.get(tourId);
	if (!tour) return undefined;
	Object.assign(tour, patch, { updated_at: now() });
	return tour;
};

export const setTourStatus = (tourId: string, status: TourStatus) =>
	patchTour(tourId, { status });

export const deleteTour = (tourId: string) => {
	financialsStore.delete(tourId);
	return tourStore.delete(tourId);
};

export const getTourFinancials = (tourId: string) =>
	financialsStore.get(tourId);

export const saveTourFinancials = (
	tourId: string,
	body: Partial<CreateFinancialSchema>
): TourFinSettingsModel => {
	const current =
		financialsStore.get(tourId) ??
		createTourFinancialsMock(tourId, financialsStore.size);
	const next: TourFinSettingsModel = {
		...current,
		...(body.currency_type ? { currency_type: body.currency_type } : {}),
		...(body.markup !== undefined ? { markup: body.markup } : {}),
		...(body.foc !== undefined ? { foc: body.foc } : {})
	};
	financialsStore.set(tourId, next);
	return next;
};

export const resetTourStore = () => {
	tourStore = createTourStore();
	financialsStore = createFinancialsStore();
	tourIds.reset(TOURS_MOCK.length);
};
