import type {
	FixedDateCreate,
	FixedDateModel,
	FixedDatesBulkCreate,
	FixedDatesBulkDelete,
	FullScheduleSchema,
	RecurrenceDateModel,
	RecurrenceRuleCreate,
	RecurrenceRulesBulkCreate,
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
	bulkAddFixedDates: (tourId: string) =>
		({
			url: `/tour/${tourId}/schedule/date/bulk`,
			method: "POST",
			_types: {} as {
				body: FixedDatesBulkCreate;
				query: void;
				response: FixedDateModel[];
			}
		}) as const,
	bulkRemoveFixedDates: (tourId: string) =>
		({
			url: `/tour/${tourId}/schedule/date/bulk`,
			method: "DELETE",
			_types: {} as {
				body: FixedDatesBulkDelete;
				query: void;
				response: void;
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
	bulkAddRecurrenceRules: (tourId: string) =>
		({
			url: `/tour/${tourId}/schedule/rule/bulk`,
			method: "POST",
			_types: {} as {
				body: RecurrenceRulesBulkCreate;
				query: void;
				response: RecurrenceDateModel[];
			}
		}) as const,
	removeRecurrenceRule: (tourId: string, ruleId: string) =>
		({
			url: `/tour/${tourId}/schedule/rule/${ruleId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	getScheduleOccurrences: (tourId: string) =>
		({
			url: `/tour/${tourId}/schedule/occurrences`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { from: string; to: string };
				response: string[];
			}
		}) as const
} as const;
