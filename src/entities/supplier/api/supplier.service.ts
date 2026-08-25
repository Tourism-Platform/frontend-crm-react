import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import { SUPPLIER_PATHS } from "@/shared/api/generated/paths/supplier.paths";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapSupplierFiltersToBackend,
	mapSupplierFromBackend,
	mapSupplierListToFrontend,
	mapSupplierToCreate,
	mapSupplierToUpdate
} from "../converters";
import type {
	ICreateSupplier,
	IDeleteSupplier,
	IDeleteSupplierLogo,
	IGetSupplier,
	ISupplier,
	ISupplierFilters,
	IUpdateSupplier,
	IUploadSupplierLogo,
	TSupplierBackend,
	TSupplierListBackend
} from "../types";

export const supplierApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listSuppliers: builder.query<
			IPaginationResponse<ISupplier>,
			ISupplierFilters
		>({
			query: (filters) => ({
				...SUPPLIER_PATHS.listSuppliers,
				params: mapSupplierFiltersToBackend(filters)
			}),
			transformResponse: (response: TSupplierListBackend) =>
				mapSupplierListToFrontend(response),
			providesTags: (result) =>
				result
					? [
							{ type: ENUM_API_TAGS.SUPPLIERS, id: "LIST" },
							...result.data.map((supplier) => ({
								type: ENUM_API_TAGS.SUPPLIERS,
								id: supplier.id
							}))
						]
					: [{ type: ENUM_API_TAGS.SUPPLIERS, id: "LIST" }]
		}),
		getSupplier: builder.query<ISupplier, IGetSupplier>({
			query: ({ supplierId }) => ({
				...SUPPLIER_PATHS.getSupplier(supplierId)
			}),
			transformResponse: mapSupplierFromBackend,
			providesTags: (_result, _error, { supplierId }) => [
				{ type: ENUM_API_TAGS.SUPPLIERS, id: supplierId }
			]
		}),
		createSupplier: builder.mutation<ISupplier, ICreateSupplier>({
			query: ({ data }) => ({
				...SUPPLIER_PATHS.createSupplier,
				body: mapSupplierToCreate(data)
			}),
			transformResponse: (response: TSupplierBackend) =>
				mapSupplierFromBackend(response),
			invalidatesTags: [{ type: ENUM_API_TAGS.SUPPLIERS, id: "LIST" }]
		}),
		updateSupplier: builder.mutation<ISupplier, IUpdateSupplier>({
			query: ({ supplierId, data }) => ({
				...SUPPLIER_PATHS.updateSupplier(supplierId),
				body: mapSupplierToUpdate(data)
			}),
			transformResponse: (response: TSupplierBackend) =>
				mapSupplierFromBackend(response),
			invalidatesTags: (_result, _error, { supplierId }) => [
				{ type: ENUM_API_TAGS.SUPPLIERS, id: supplierId },
				{ type: ENUM_API_TAGS.SUPPLIERS, id: "LIST" }
			]
		}),
		deleteSupplier: builder.mutation<void, IDeleteSupplier>({
			query: ({ supplierId }) => ({
				...SUPPLIER_PATHS.deleteSupplier(supplierId)
			}),
			invalidatesTags: (_result, _error, { supplierId }) => [
				{ type: ENUM_API_TAGS.SUPPLIERS, id: supplierId },
				{ type: ENUM_API_TAGS.SUPPLIERS, id: "LIST" },
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		uploadSupplierLogo: builder.mutation<ISupplier, IUploadSupplierLogo>({
			query: ({ supplierId, file }) => {
				const formData = new FormData();
				formData.append("file", file);
				return {
					...SUPPLIER_PATHS.addLogo(supplierId),
					body: formData
				};
			},
			transformResponse: (response: TSupplierBackend) =>
				mapSupplierFromBackend(response),
			invalidatesTags: (_result, _error, { supplierId }) => [
				{ type: ENUM_API_TAGS.SUPPLIERS, id: supplierId },
				{ type: ENUM_API_TAGS.SUPPLIERS, id: "LIST" }
			]
		}),
		deleteSupplierLogo: builder.mutation<void, IDeleteSupplierLogo>({
			query: ({ supplierId }) => ({
				...SUPPLIER_PATHS.deleteLogo(supplierId)
			}),
			invalidatesTags: (_result, _error, { supplierId }) => [
				{ type: ENUM_API_TAGS.SUPPLIERS, id: supplierId },
				{ type: ENUM_API_TAGS.SUPPLIERS, id: "LIST" }
			]
		})
	})
});

export const {
	useListSuppliersQuery,
	useLazyListSuppliersQuery,
	useGetSupplierQuery,
	useLazyGetSupplierQuery,
	useCreateSupplierMutation,
	useUpdateSupplierMutation,
	useDeleteSupplierMutation,
	useUploadSupplierLogoMutation,
	useDeleteSupplierLogoMutation
} = supplierApi;
