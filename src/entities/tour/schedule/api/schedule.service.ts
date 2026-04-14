import { TOUR_SCHEDULE_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapFixedDateToBackend,
	mapFixedDateToFrontend,
	mapFullScheduleToFrontend,
	mapRecurrenceRuleToBackend,
	mapRecurrenceRuleToFrontend,
	mapScheduleToBackend,
	mapScheduleToFrontend
} from "../converters";
import type {
	IFixedDate,
	IFixedDateCreate,
	IFullSchedule,
	IRecurrenceRule,
	IRecurrenceRuleCreate,
	ISchedule,
	TFixedDateBackend,
	TFullScheduleBackend,
	TRecurrenceRuleBackend
} from "../types";

export const tourScheduleApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getSchedule: builder.query<IFullSchedule, string>({
			query: (tourId) => ({
				...TOUR_SCHEDULE_PATHS.getTourSchedule(tourId)
			}),
			transformResponse: (response: TFullScheduleBackend) =>
				mapFullScheduleToFrontend(response)
		}),
		updateSchedule: builder.mutation<
			ISchedule,
			{ tourId: string; data: ISchedule }
		>({
			query: ({ tourId, data }) => ({
				...TOUR_SCHEDULE_PATHS.updateTourSchedule(tourId),
				body: mapScheduleToBackend(data)
			}),
			transformResponse: (response: TFullScheduleBackend) =>
				mapScheduleToFrontend(response.schedule)
		}),
		addFixedDate: builder.mutation<
			IFixedDate,
			{ tourId: string; data: IFixedDateCreate }
		>({
			query: ({ tourId, data }) => ({
				...TOUR_SCHEDULE_PATHS.addFixedDate(tourId),
				body: mapFixedDateToBackend(data)
			}),
			transformResponse: (response: TFixedDateBackend) =>
				mapFixedDateToFrontend(response),
			async onQueryStarted({ tourId }, { dispatch, queryFulfilled }) {
				try {
					const { data: newDate } = await queryFulfilled;
					dispatch(
						tourScheduleApi.util.updateQueryData(
							"getSchedule",
							tourId,
							(draft) => {
								draft.fixedDates.push(newDate);
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		}),
		removeFixedDate: builder.mutation<
			void,
			{ tourId: string; dateId: string }
		>({
			query: ({ tourId, dateId }) => ({
				...TOUR_SCHEDULE_PATHS.removeFixedDate(tourId, dateId)
			}),
			async onQueryStarted(
				{ tourId, dateId },
				{ dispatch, queryFulfilled }
			) {
				try {
					await queryFulfilled;
					dispatch(
						tourScheduleApi.util.updateQueryData(
							"getSchedule",
							tourId,
							(draft) => {
								draft.fixedDates = draft.fixedDates.filter(
									(date) => date.id !== dateId
								);
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		}),
		addRecurrenceRule: builder.mutation<
			IRecurrenceRule,
			{ tourId: string; data: IRecurrenceRuleCreate }
		>({
			query: ({ tourId, data }) => ({
				...TOUR_SCHEDULE_PATHS.addRecurrenceRule(tourId),
				body: mapRecurrenceRuleToBackend(data)
			}),
			transformResponse: (response: TRecurrenceRuleBackend) =>
				mapRecurrenceRuleToFrontend(response),
			async onQueryStarted({ tourId }, { dispatch, queryFulfilled }) {
				try {
					const { data: newRule } = await queryFulfilled;
					dispatch(
						tourScheduleApi.util.updateQueryData(
							"getSchedule",
							tourId,
							(draft) => {
								draft.recurrenceRules.push(newRule);
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		}),
		removeRecurrenceRule: builder.mutation<
			void,
			{ tourId: string; ruleId: string }
		>({
			query: ({ tourId, ruleId }) => ({
				...TOUR_SCHEDULE_PATHS.removeRecurrenceRule(tourId, ruleId)
			}),
			async onQueryStarted(
				{ tourId, ruleId },
				{ dispatch, queryFulfilled }
			) {
				try {
					await queryFulfilled;
					dispatch(
						tourScheduleApi.util.updateQueryData(
							"getSchedule",
							tourId,
							(draft) => {
								draft.recurrenceRules =
									draft.recurrenceRules.filter(
										(rule) => rule.id !== ruleId
									);
							}
						)
					);
				} catch (error) {
					console.error(error);
				}
			}
		})
	})
});

export const {
	useGetScheduleQuery,
	useUpdateScheduleMutation,
	useAddFixedDateMutation,
	useRemoveFixedDateMutation,
	useAddRecurrenceRuleMutation,
	useRemoveRecurrenceRuleMutation
} = tourScheduleApi;
