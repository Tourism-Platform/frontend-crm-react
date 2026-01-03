import { ENUM_API_TAGS } from "@/shared/api";
import { type IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import { mapActivityLogToFrontend } from "../converters";
import type { IActivityLogFilters, IActivityLogItem } from "../types";

export const activityLogApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getActivityLog: builder.query<
			IPaginationResponse<IActivityLogItem>,
			IActivityLogFilters
		>({
			query: (filters) => {
				const { tourId, ...params } = filters;
				return {
					url: `/tours/${tourId}/activity-log`,
					params
				};
			},
			transformResponse: (
				response: IPaginationResponse<IActivityLogItem>
			) => ({
				...response,
				data: response.data.map(mapActivityLogToFrontend)
			}),
			providesTags: [ENUM_API_TAGS.ACTIVITY_LOG]
		})
	})
});

export const { useGetActivityLogQuery } = activityLogApi;
