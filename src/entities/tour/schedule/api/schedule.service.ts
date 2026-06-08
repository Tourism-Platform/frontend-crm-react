import { TOUR_SCHEDULE_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapExcludedDateToBackend,
	mapExcludedDateToFrontend,
	mapFixedDateToBackend,
	mapFixedDateToFrontend,
	mapFullScheduleToFrontend,
	mapRecurrenceRuleToBackend,
	mapRecurrenceRuleToFrontend,
	mapScheduleToBackend,
	mapScheduleToFrontend
} from "../converters";
import type {
	IExcludedDate,
	IExcludedDateCreate,
	IFixedDate,
	IFixedDateCreate,
	IFullSchedule,
	IGetScheduleArgs,
	IRecurrenceRule,
	IRecurrenceRuleCreate,
	ISchedule,
	TExcludedDateBackend,
	TFixedDateBackend,
	TFullScheduleBackend,
	TRecurrenceRuleBackend
} from "../types";

export const tourScheduleApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getSchedule: builder.query<IFullSchedule, IGetScheduleArgs>({
			query: ({ tourId, from, to }) => ({
				...TOUR_SCHEDULE_PATHS.getTourSchedule(tourId),
				params: from && to ? { from, to } : undefined
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
				mapScheduleToFrontend(response.schedule),
			async onQueryStarted(
				{ tourId },
				{ dispatch, getState, queryFulfilled }
			) {
				try {
					const { data: updated } = await queryFulfilled;
					const queries = getState().authApi.queries;

					for (const entry of Object.values(queries)) {
						const args = entry?.originalArgs as
							| IGetScheduleArgs
							| undefined;

						if (
							entry?.endpointName !== "getSchedule" ||
							args?.tourId !== tourId
						) {
							continue;
						}

						dispatch(
							tourScheduleApi.util.updateQueryData(
								"getSchedule",
								args,
								(draft) => {
									draft.schedule.isSeasonal =
										updated.isSeasonal;
								}
							)
						);
					}
				} catch (error) {
					console.error(error);
				}
			}
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
			async onQueryStarted(
				{ tourId },
				{ dispatch, getState, queryFulfilled }
			) {
				try {
					await queryFulfilled;
					refetchAllScheduleQueries(dispatch, getState, tourId);
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
				{ tourId },
				{ dispatch, getState, queryFulfilled }
			) {
				try {
					await queryFulfilled;
					refetchAllScheduleQueries(dispatch, getState, tourId);
				} catch (error) {
					console.error(error);
				}
			}
		}),
		addExcludedDate: builder.mutation<
			IExcludedDate,
			{ tourId: string; data: IExcludedDateCreate }
		>({
			query: ({ tourId, data }) => ({
				...TOUR_SCHEDULE_PATHS.addExcludedDate(tourId),
				body: mapExcludedDateToBackend(data)
			}),
			transformResponse: (response: TExcludedDateBackend) =>
				mapExcludedDateToFrontend(response),
			async onQueryStarted(
				{ tourId },
				{ dispatch, getState, queryFulfilled }
			) {
				try {
					await queryFulfilled;
					refetchAllScheduleQueries(dispatch, getState, tourId);
				} catch (error) {
					console.error(error);
				}
			}
		}),
		removeExcludedDate: builder.mutation<
			void,
			{ tourId: string; dateId: string }
		>({
			query: ({ tourId, dateId }) => ({
				...TOUR_SCHEDULE_PATHS.removeExcludedDate(tourId, dateId)
			}),
			async onQueryStarted(
				{ tourId },
				{ dispatch, getState, queryFulfilled }
			) {
				try {
					await queryFulfilled;
					refetchAllScheduleQueries(dispatch, getState, tourId);
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
				mapRecurrenceRuleToFrontend(response)
		}),
		bulkAddRecurrenceRules: builder.mutation<
			IRecurrenceRule[],
			{ tourId: string; rules: IRecurrenceRuleCreate[] }
		>({
			query: ({ tourId, rules }) => ({
				...TOUR_SCHEDULE_PATHS.bulkAddRecurrenceRules(tourId),
				body: {
					rules: rules.map(mapRecurrenceRuleToBackend)
				}
			}),
			transformResponse: (response: TRecurrenceRuleBackend[]) =>
				response.map(mapRecurrenceRuleToFrontend)
		}),
		removeRecurrenceRule: builder.mutation<
			void,
			{ tourId: string; ruleId: string }
		>({
			query: ({ tourId, ruleId }) => ({
				...TOUR_SCHEDULE_PATHS.removeRecurrenceRule(tourId, ruleId)
			})
		})
	})
});

type TScheduleRefetchAction = ReturnType<
	typeof tourScheduleApi.endpoints.getSchedule.initiate
>;

type TScheduleQueriesState = {
	authApi: {
		queries: Record<string, unknown>;
	};
};

export function refetchAllScheduleQueries(
	dispatch: (action: TScheduleRefetchAction) => void,
	getState: () => TScheduleQueriesState,
	tourId: string
): void {
	const queries = getState().authApi.queries;

	for (const entry of Object.values(queries)) {
		const queryEntry = entry as
			| {
					endpointName?: string;
					originalArgs?: IGetScheduleArgs;
			  }
			| undefined;
		const args = queryEntry?.originalArgs;

		if (
			queryEntry?.endpointName !== "getSchedule" ||
			args?.tourId !== tourId
		) {
			continue;
		}

		dispatch(
			tourScheduleApi.endpoints.getSchedule.initiate(args, {
				forceRefetch: true
			})
		);
	}
}

export const {
	useGetScheduleQuery,
	useUpdateScheduleMutation,
	useAddFixedDateMutation,
	useRemoveFixedDateMutation,
	useAddExcludedDateMutation,
	useRemoveExcludedDateMutation,
	useAddRecurrenceRuleMutation,
	useBulkAddRecurrenceRulesMutation,
	useRemoveRecurrenceRuleMutation
} = tourScheduleApi;
