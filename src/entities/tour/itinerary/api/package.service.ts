import { ENUM_API_TAGS, TOUR_PACKAGES_PATHS } from "@/shared/api";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapPackageCreateToBackend,
	mapPackageToForm,
	mapPackageToFrontend,
	mapPackageToListItem,
	mapPackageUpdateToBackend
} from "../converters/package.converters";
import type { TPackageEditSchema } from "../schema/package.schema";
import type {
	ITourPackage,
	ITourPackageListItem,
	TCreatePackageBackendResponse,
	TGetPackageBackendResponse,
	TListPackagesBackendResponse,
	TUpdatePackageBackendResponse
} from "../types";

const packagesTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOURS_PACKAGES,
	id: `${tourId}:${optionId}`
});

const packageDetailTag = (
	tourId: string,
	optionId: string,
	packageId: string
) => ({
	type: ENUM_API_TAGS.TOURS_PACKAGES,
	id: `${tourId}:${optionId}:${packageId}`
});

const pricingTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
	id: `${tourId}:${optionId}`
});

export const tourPackageApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listPackages: builder.query<
			ITourPackageListItem[],
			{ tourId: string; optionId: string }
		>({
			query: ({ tourId, optionId }) => ({
				...TOUR_PACKAGES_PATHS.listPackages(tourId, optionId)
			}),
			transformResponse: (response: TListPackagesBackendResponse) =>
				response.map(mapPackageToListItem),
			providesTags: (_result, _error, { tourId, optionId }) => [
				packagesTag(tourId, optionId)
			]
		}),
		getPackage: builder.query<
			TPackageEditSchema,
			{ tourId: string; optionId: string; packageId: string }
		>({
			query: ({ tourId, optionId, packageId }) => ({
				...TOUR_PACKAGES_PATHS.getPackage(tourId, optionId, packageId)
			}),
			transformResponse: (response: TGetPackageBackendResponse) =>
				mapPackageToForm(response),
			providesTags: (
				_result,
				_error,
				{ tourId, optionId, packageId }
			) => [packageDetailTag(tourId, optionId, packageId)]
		}),
		createPackage: builder.mutation<
			ITourPackage,
			{ tourId: string; optionId: string; data: TPackageEditSchema }
		>({
			query: ({ tourId, optionId, data }) => ({
				...TOUR_PACKAGES_PATHS.createPackage(tourId, optionId),
				body: mapPackageCreateToBackend(data)
			}),
			transformResponse: (response: TCreatePackageBackendResponse) =>
				mapPackageToFrontend(response),
			invalidatesTags: (_result, _error, { tourId, optionId }) => [
				packagesTag(tourId, optionId),
				pricingTag(tourId, optionId)
			]
		}),
		updatePackage: builder.mutation<
			ITourPackage,
			{
				tourId: string;
				optionId: string;
				packageId: string;
				data: TPackageEditSchema;
			}
		>({
			query: ({ tourId, optionId, packageId, data }) => ({
				...TOUR_PACKAGES_PATHS.updatePackage(
					tourId,
					optionId,
					packageId
				),
				body: mapPackageUpdateToBackend(data)
			}),
			transformResponse: (response: TUpdatePackageBackendResponse) =>
				mapPackageToFrontend(response),
			invalidatesTags: (
				_result,
				_error,
				{ tourId, optionId, packageId }
			) => [
				packagesTag(tourId, optionId),
				packageDetailTag(tourId, optionId, packageId),
				pricingTag(tourId, optionId)
			]
		})
	})
});

export const {
	useListPackagesQuery,
	useGetPackageQuery,
	useCreatePackageMutation,
	useUpdatePackageMutation
} = tourPackageApi;
