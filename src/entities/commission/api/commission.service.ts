import { ENUM_API_TAGS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import type { ICommission } from "../types";

export const commissionApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getCommissions: builder.query<ICommission[], void>({
			query: () => "/commissions",
			providesTags: [ENUM_API_TAGS.COMMISSION]
		}),
		createCommission: builder.mutation<ICommission, Partial<ICommission>>({
			query: (commission) => ({
				url: "/commissions",
				method: "POST",
				body: commission
			}),
			invalidatesTags: [ENUM_API_TAGS.COMMISSION]
		}),
		updateCommission: builder.mutation<
			ICommission,
			{ id: string; data: Partial<ICommission> }
		>({
			query: ({ id, data }) => ({
				url: `/commissions/${id}`,
				method: "PATCH",
				body: data
			}),
			invalidatesTags: [ENUM_API_TAGS.COMMISSION]
		}),
		deleteCommission: builder.mutation<void, string>({
			query: (id) => ({
				url: `/commissions/${id}`,
				method: "DELETE"
			}),
			invalidatesTags: [ENUM_API_TAGS.COMMISSION]
		})
	})
});

export const {
	useGetCommissionsQuery,
	useCreateCommissionMutation,
	useUpdateCommissionMutation,
	useDeleteCommissionMutation
} = commissionApi;
