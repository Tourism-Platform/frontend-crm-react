import type {
	FixedDateCreate,
	FixedDateModel,
	FullScheduleSchema,
	RecurrenceDateModel,
	RecurrenceRuleCreate,
	TourScheduleUpdate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_SCHEDULE_PATHS = {
	getTourSchedule: (tourId: string) =>
		({
			url: `/tour/${tourId}/schedule/`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: FullScheduleSchema;
			}
		}) as const,
	updateTourSchedule: (tourId: string) =>
		({
			url: `/tour/${tourId}/schedule/`,
			method: "PATCH",
			_types: {} as {
				body: TourScheduleUpdate;
				query: void;
				response: FullScheduleSchema;
			}
		}) as const,
	addFixedDate: (tourId: string) =>
		({
			url: `/tour/${tourId}/schedule/date`,
			method: "POST",
			_types: {} as {
				body: FixedDateCreate;
				query: void;
				response: FixedDateModel;
			}
		}) as const,
	removeFixedDate: (tourId: string, dateId: string) =>
		({
			url: `/tour/${tourId}/schedule/date/${dateId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	addRecurrenceRule: (tourId: string) =>
		({
			url: `/tour/${tourId}/schedule/rule`,
			method: "POST",
			_types: {} as {
				body: RecurrenceRuleCreate;
				query: void;
				response: RecurrenceDateModel;
			}
		}) as const,
	removeRecurrenceRule: (tourId: string, ruleId: string) =>
		({
			url: `/tour/${tourId}/schedule/rule/${ruleId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
