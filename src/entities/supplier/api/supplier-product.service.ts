import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import { SUPPLIER_PRODUCT_PATHS } from "@/shared/api/generated/paths/supplier-product.paths";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapHotelProductDetailsToUpdate,
	mapHotelProductFromBackend,
	mapHotelProductNameToUpdate,
	mapHotelProductToCreate,
	mapHotelVariantFromBackend,
	mapHotelVariantToWrite,
	mapSupplierNodeImageToFrontend,
	mapSupplierProductFiltersToBackend,
	mapSupplierProductFromBackend,
	mapSupplierProductImageToFrontend,
	mapSupplierProductListToFrontend,
	mapTrainProductFromBackend,
	mapTrainProductHopsToUpdate,
	mapTrainProductNameToUpdate,
	mapTrainProductToCreate,
	mapTrainVariantFromBackend,
	mapTrainVariantToWrite
} from "../converters";
import type {
	ICreateHotelProduct,
	ICreateHotelVariant,
	ICreateTrainProduct,
	ICreateTrainVariant,
	IDeleteHotelVariant,
	IDeleteNodeImage,
	IDeleteProductImage,
	IDeleteSupplierProduct,
	IDeleteTrainVariant,
	IGetSupplierProduct,
	IHotelProduct,
	IHotelVariant,
	IListProductImages,
	ISetPrimaryNodeImage,
	ISetPrimaryProductImage,
	ISupplierNodeImage,
	ISupplierProductFilters,
	ISupplierProductImage,
	ITrainProduct,
	ITrainVariant,
	IUpdateHotelProductDetails,
	IUpdateHotelProductName,
	IUpdateHotelVariant,
	IUpdateTrainProductHops,
	IUpdateTrainProductName,
	IUpdateTrainVariant,
	IUploadNodeImages,
	IUploadProductImages,
	THotelProductReadBackend,
	THotelVariantReadBackend,
	TSupplierNodeImageBackend,
	TSupplierProduct,
	TSupplierProductImageBackend,
	TSupplierProductListBackend,
	TTrainProductReadBackend,
	TTrainVariantReadBackend
} from "../types";

const productListTags = (result?: IPaginationResponse<TSupplierProduct>) =>
	result
		? [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" as const },
				...result.data.map((product) => ({
					type: ENUM_API_TAGS.SUPPLIER_PRODUCTS,
					id: product.id
				}))
			]
		: [{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" as const }];

const productInvalidateTags = (productId: string) => [
	{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId },
	{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" as const }
];

export const supplierProductApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listAllProducts: builder.query<
			IPaginationResponse<TSupplierProduct>,
			ISupplierProductFilters
		>({
			query: (filters) => ({
				...SUPPLIER_PRODUCT_PATHS.listAllProducts,
				params: mapSupplierProductFiltersToBackend(filters)
			}),
			transformResponse: (response: TSupplierProductListBackend) =>
				mapSupplierProductListToFrontend(response),
			providesTags: (result) => productListTags(result)
		}),
		getSupplierProduct: builder.query<
			TSupplierProduct,
			IGetSupplierProduct
		>({
			query: ({ supplierId, productId }) => ({
				...SUPPLIER_PRODUCT_PATHS.getProduct(supplierId, productId)
			}),
			transformResponse: (
				response: THotelProductReadBackend | TTrainProductReadBackend
			) => mapSupplierProductFromBackend(response),
			providesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		}),
		createHotelProduct: builder.mutation<
			IHotelProduct,
			ICreateHotelProduct
		>({
			query: ({ supplierId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(supplierId),
				body: mapHotelProductToCreate(data)
			}),
			transformResponse: (response: THotelProductReadBackend) =>
				mapHotelProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateHotelProductName: builder.mutation<
			IHotelProduct,
			IUpdateHotelProductName
		>({
			query: ({ supplierId, productId, name }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapHotelProductNameToUpdate(name)
			}),
			transformResponse: (response: THotelProductReadBackend) =>
				mapHotelProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateHotelProductDetails: builder.mutation<
			IHotelProduct,
			IUpdateHotelProductDetails
		>({
			query: ({ supplierId, productId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapHotelProductDetailsToUpdate(data)
			}),
			transformResponse: (response: THotelProductReadBackend) =>
				mapHotelProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		createTrainProduct: builder.mutation<
			ITrainProduct,
			ICreateTrainProduct
		>({
			query: ({ supplierId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(supplierId),
				body: mapTrainProductToCreate(data)
			}),
			transformResponse: (response: TTrainProductReadBackend) =>
				mapTrainProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateTrainProductName: builder.mutation<
			ITrainProduct,
			IUpdateTrainProductName
		>({
			query: ({ supplierId, productId, name }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapTrainProductNameToUpdate(name)
			}),
			transformResponse: (response: TTrainProductReadBackend) =>
				mapTrainProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateTrainProductHops: builder.mutation<
			ITrainProduct,
			IUpdateTrainProductHops
		>({
			query: ({ supplierId, productId, hops }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapTrainProductHopsToUpdate(hops)
			}),
			transformResponse: (response: TTrainProductReadBackend) =>
				mapTrainProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		deleteSupplierProduct: builder.mutation<void, IDeleteSupplierProduct>({
			query: ({ supplierId, productId }) => ({
				...SUPPLIER_PRODUCT_PATHS.deleteProduct(supplierId, productId)
			}),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		createHotelVariant: builder.mutation<
			IHotelVariant,
			ICreateHotelVariant
		>({
			query: ({ supplierId, productId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.createVariant(supplierId, productId),
				body: mapHotelVariantToWrite(data)
			}),
			transformResponse: (response: THotelVariantReadBackend) =>
				mapHotelVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateHotelVariant: builder.mutation<
			IHotelVariant,
			IUpdateHotelVariant
		>({
			query: ({ supplierId, productId, variantId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateVariant(
					supplierId,
					productId,
					variantId
				),
				body: mapHotelVariantToWrite(data)
			}),
			transformResponse: (response: THotelVariantReadBackend) =>
				mapHotelVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		deleteHotelVariant: builder.mutation<void, IDeleteHotelVariant>({
			query: ({ supplierId, productId, variantId }) => ({
				...SUPPLIER_PRODUCT_PATHS.deleteVariant(
					supplierId,
					productId,
					variantId
				)
			}),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		createTrainVariant: builder.mutation<
			ITrainVariant,
			ICreateTrainVariant
		>({
			query: ({ supplierId, productId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.createVariant(supplierId, productId),
				body: mapTrainVariantToWrite(data)
			}),
			transformResponse: (response: TTrainVariantReadBackend) =>
				mapTrainVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateTrainVariant: builder.mutation<
			ITrainVariant,
			IUpdateTrainVariant
		>({
			query: ({ supplierId, productId, variantId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateVariant(
					supplierId,
					productId,
					variantId
				),
				body: mapTrainVariantToWrite(data)
			}),
			transformResponse: (response: TTrainVariantReadBackend) =>
				mapTrainVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		deleteTrainVariant: builder.mutation<void, IDeleteTrainVariant>({
			query: ({ supplierId, productId, variantId }) => ({
				...SUPPLIER_PRODUCT_PATHS.deleteVariant(
					supplierId,
					productId,
					variantId
				)
			}),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		listProductImages: builder.query<
			ISupplierProductImage[],
			IListProductImages
		>({
			query: ({ supplierId, productId }) => ({
				...SUPPLIER_PRODUCT_PATHS.listProductImages(
					supplierId,
					productId
				)
			}),
			transformResponse: (response: TSupplierProductImageBackend[]) =>
				response.map(mapSupplierProductImageToFrontend),
			providesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		}),
		uploadProductImages: builder.mutation<
			ISupplierProductImage[],
			IUploadProductImages
		>({
			query: ({ supplierId, productId, files }) => {
				const formData = new FormData();
				files.forEach((file) => formData.append("images", file));
				return {
					...SUPPLIER_PRODUCT_PATHS.uploadProductImages(
						supplierId,
						productId
					),
					body: formData
				};
			},
			transformResponse: (response: TSupplierProductImageBackend[]) =>
				response.map(mapSupplierProductImageToFrontend),
			invalidatesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		}),
		setPrimaryProductImage: builder.mutation<void, ISetPrimaryProductImage>(
			{
				query: ({ supplierId, productId, imageId }) => ({
					...SUPPLIER_PRODUCT_PATHS.setPrimaryProductImage(
						supplierId,
						productId,
						imageId
					)
				}),
				invalidatesTags: (_result, _error, { productId }) => [
					{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
				]
			}
		),
		deleteProductImage: builder.mutation<void, IDeleteProductImage>({
			query: ({ supplierId, productId, imageId }) => ({
				...SUPPLIER_PRODUCT_PATHS.deleteProductImage(
					supplierId,
					productId,
					imageId
				)
			}),
			invalidatesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		}),
		uploadNodeImages: builder.mutation<
			ISupplierNodeImage[],
			IUploadNodeImages
		>({
			query: ({ supplierId, productId, variantId, nodeId, files }) => {
				const formData = new FormData();
				files.forEach((file) => formData.append("images", file));
				return {
					...SUPPLIER_PRODUCT_PATHS.uploadNodeImages(
						supplierId,
						productId,
						variantId,
						nodeId
					),
					body: formData
				};
			},
			transformResponse: (response: TSupplierNodeImageBackend[]) =>
				response.map(mapSupplierNodeImageToFrontend),
			invalidatesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		}),
		setPrimaryNodeImage: builder.mutation<void, ISetPrimaryNodeImage>({
			query: ({ supplierId, productId, variantId, nodeId, imageId }) => ({
				...SUPPLIER_PRODUCT_PATHS.setPrimaryNodeImageRoute(
					supplierId,
					productId,
					variantId,
					nodeId,
					imageId
				)
			}),
			invalidatesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		}),
		deleteNodeImage: builder.mutation<void, IDeleteNodeImage>({
			query: ({ supplierId, productId, variantId, nodeId, imageId }) => ({
				...SUPPLIER_PRODUCT_PATHS.deleteNodeImage(
					supplierId,
					productId,
					variantId,
					nodeId,
					imageId
				)
			}),
			invalidatesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		})
	})
});

export const {
	useListAllProductsQuery,
	useLazyListAllProductsQuery,
	useGetSupplierProductQuery,
	useLazyGetSupplierProductQuery,
	useCreateHotelProductMutation,
	useUpdateHotelProductNameMutation,
	useUpdateHotelProductDetailsMutation,
	useCreateTrainProductMutation,
	useUpdateTrainProductNameMutation,
	useUpdateTrainProductHopsMutation,
	useDeleteSupplierProductMutation,
	useCreateHotelVariantMutation,
	useUpdateHotelVariantMutation,
	useDeleteHotelVariantMutation,
	useCreateTrainVariantMutation,
	useUpdateTrainVariantMutation,
	useDeleteTrainVariantMutation,
	useListProductImagesQuery,
	useUploadProductImagesMutation,
	useSetPrimaryProductImageMutation,
	useDeleteProductImageMutation,
	useUploadNodeImagesMutation,
	useSetPrimaryNodeImageMutation,
	useDeleteNodeImageMutation
} = supplierProductApi;
