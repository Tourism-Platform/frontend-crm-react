import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import { SUPPLIER_PRODUCT_PATHS } from "@/shared/api/generated/paths/supplier-product.paths";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapActivityProductFromBackend,
	mapActivityProductGeneralToCreate,
	mapActivityProductGeneralToUpdate,
	mapActivityVariantFromBackend,
	mapActivityVariantToWrite,
	mapBusProductFromBackend,
	mapBusProductGeneralToCreate,
	mapBusProductGeneralToUpdate,
	mapBusVariantFromBackend,
	mapBusVariantToWrite,
	mapFlightProductFromBackend,
	mapFlightProductGeneralToCreate,
	mapFlightProductGeneralToUpdate,
	mapFlightVariantFromBackend,
	mapFlightVariantToWrite,
	mapHotelProductFromBackend,
	mapHotelProductGeneralToCreate,
	mapHotelProductGeneralToUpdate,
	mapHotelVariantFromBackend,
	mapHotelVariantToWrite,
	mapSupplierNodeImageToFrontend,
	mapSupplierProductFiltersToBackend,
	mapSupplierProductFromBackend,
	mapSupplierProductImageToFrontend,
	mapSupplierProductListToFrontend,
	mapTrainProductFromBackend,
	mapTrainProductGeneralToCreate,
	mapTrainProductGeneralToUpdate,
	mapTrainVariantFromBackend,
	mapTrainVariantToWrite,
	mapTransferProductFromBackend,
	mapTransferProductGeneralToCreate,
	mapTransferProductGeneralToUpdate,
	mapTransferVariantFromBackend,
	mapTransferVariantToWrite
} from "../converters";
import type {
	IActivityProduct,
	IActivityVariant,
	IBusProduct,
	IBusVariant,
	ICreateActivityProduct,
	ICreateActivityVariant,
	ICreateBusProduct,
	ICreateBusVariant,
	ICreateFlightProduct,
	ICreateFlightVariant,
	ICreateHotelProduct,
	ICreateHotelVariant,
	ICreateTrainProduct,
	ICreateTrainVariant,
	ICreateTransferProduct,
	ICreateTransferVariant,
	IDeleteActivityVariant,
	IDeleteBusVariant,
	IDeleteFlightVariant,
	IDeleteHotelVariant,
	IDeleteNodeImage,
	IDeleteProductImage,
	IDeleteSupplierProduct,
	IDeleteTrainVariant,
	IDeleteTransferVariant,
	IFlightProduct,
	IFlightVariant,
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
	ITransferProduct,
	ITransferVariant,
	IUpdateActivityProduct,
	IUpdateActivityVariant,
	IUpdateBusProduct,
	IUpdateBusVariant,
	IUpdateFlightProduct,
	IUpdateFlightVariant,
	IUpdateHotelProduct,
	IUpdateHotelVariant,
	IUpdateTrainProduct,
	IUpdateTrainVariant,
	IUpdateTransferProduct,
	IUpdateTransferVariant,
	IUploadNodeImages,
	IUploadProductImages,
	TActivityProductReadBackend,
	TActivityVariantReadBackend,
	TBusProductReadBackend,
	TBusVariantReadBackend,
	TFlightProductReadBackend,
	TFlightVariantReadBackend,
	THotelProductReadBackend,
	THotelVariantReadBackend,
	TSupplierNodeImageBackend,
	TSupplierProduct,
	TSupplierProductImageBackend,
	TSupplierProductListBackend,
	TTrainProductReadBackend,
	TTrainVariantReadBackend,
	TTransferProductReadBackend,
	TTransferVariantReadBackend
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
				response: ReturnType<
					typeof SUPPLIER_PRODUCT_PATHS.getProduct
				>["_types"]["response"]
			) => mapSupplierProductFromBackend(response),
			providesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		}),
		createHotelProduct: builder.mutation<
			IHotelProduct,
			ICreateHotelProduct
		>({
			query: ({ supplierId, values, language }) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(supplierId),
				body: mapHotelProductGeneralToCreate(values, language)
			}),
			transformResponse: (response: THotelProductReadBackend) =>
				mapHotelProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateHotelProduct: builder.mutation<
			IHotelProduct,
			IUpdateHotelProduct
		>({
			query: ({
				supplierId,
				productId,
				values,
				language,
				existingPolicy
			}) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapHotelProductGeneralToUpdate(
					values,
					existingPolicy,
					language
				)
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
			query: ({ supplierId, values, language }) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(supplierId),
				body: mapTrainProductGeneralToCreate(values, language)
			}),
			transformResponse: (response: TTrainProductReadBackend) =>
				mapTrainProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateTrainProduct: builder.mutation<
			ITrainProduct,
			IUpdateTrainProduct
		>({
			query: ({ supplierId, productId, values, language }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapTrainProductGeneralToUpdate(values, language)
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
		createFlightProduct: builder.mutation<
			IFlightProduct,
			ICreateFlightProduct
		>({
			query: ({ supplierId, values, language }) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(supplierId),
				body: mapFlightProductGeneralToCreate(values, language)
			}),
			transformResponse: (response: TFlightProductReadBackend) =>
				mapFlightProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateFlightProduct: builder.mutation<
			IFlightProduct,
			IUpdateFlightProduct
		>({
			query: ({ supplierId, productId, values, language }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapFlightProductGeneralToUpdate(values, language)
			}),
			transformResponse: (response: TFlightProductReadBackend) =>
				mapFlightProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		createFlightVariant: builder.mutation<
			IFlightVariant,
			ICreateFlightVariant
		>({
			query: ({ supplierId, productId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.createVariant(supplierId, productId),
				body: mapFlightVariantToWrite(data)
			}),
			transformResponse: (response: TFlightVariantReadBackend) =>
				mapFlightVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateFlightVariant: builder.mutation<
			IFlightVariant,
			IUpdateFlightVariant
		>({
			query: ({ supplierId, productId, variantId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateVariant(
					supplierId,
					productId,
					variantId
				),
				body: mapFlightVariantToWrite(data)
			}),
			transformResponse: (response: TFlightVariantReadBackend) =>
				mapFlightVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		deleteFlightVariant: builder.mutation<void, IDeleteFlightVariant>({
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
		createBusProduct: builder.mutation<IBusProduct, ICreateBusProduct>({
			query: ({ supplierId, values }) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(supplierId),
				body: mapBusProductGeneralToCreate(values)
			}),
			transformResponse: (response: TBusProductReadBackend) =>
				mapBusProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateBusProduct: builder.mutation<IBusProduct, IUpdateBusProduct>({
			query: ({ supplierId, productId, values }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapBusProductGeneralToUpdate(values)
			}),
			transformResponse: (response: TBusProductReadBackend) =>
				mapBusProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		createBusVariant: builder.mutation<IBusVariant, ICreateBusVariant>({
			query: ({ supplierId, productId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.createVariant(supplierId, productId),
				body: mapBusVariantToWrite(data)
			}),
			transformResponse: (response: TBusVariantReadBackend) =>
				mapBusVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateBusVariant: builder.mutation<IBusVariant, IUpdateBusVariant>({
			query: ({ supplierId, productId, variantId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateVariant(
					supplierId,
					productId,
					variantId
				),
				body: mapBusVariantToWrite(data)
			}),
			transformResponse: (response: TBusVariantReadBackend) =>
				mapBusVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		deleteBusVariant: builder.mutation<void, IDeleteBusVariant>({
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
		createTransferProduct: builder.mutation<
			ITransferProduct,
			ICreateTransferProduct
		>({
			query: ({ supplierId, values }) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(supplierId),
				body: mapTransferProductGeneralToCreate(values)
			}),
			transformResponse: (response: TTransferProductReadBackend) =>
				mapTransferProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateTransferProduct: builder.mutation<
			ITransferProduct,
			IUpdateTransferProduct
		>({
			query: ({ supplierId, productId, values }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapTransferProductGeneralToUpdate(values)
			}),
			transformResponse: (response: TTransferProductReadBackend) =>
				mapTransferProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		createTransferVariant: builder.mutation<
			ITransferVariant,
			ICreateTransferVariant
		>({
			query: ({ supplierId, productId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.createVariant(supplierId, productId),
				body: mapTransferVariantToWrite(data)
			}),
			transformResponse: (response: TTransferVariantReadBackend) =>
				mapTransferVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateTransferVariant: builder.mutation<
			ITransferVariant,
			IUpdateTransferVariant
		>({
			query: ({ supplierId, productId, variantId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateVariant(
					supplierId,
					productId,
					variantId
				),
				body: mapTransferVariantToWrite(data)
			}),
			transformResponse: (response: TTransferVariantReadBackend) =>
				mapTransferVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		deleteTransferVariant: builder.mutation<void, IDeleteTransferVariant>({
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
		createActivityProduct: builder.mutation<
			IActivityProduct,
			ICreateActivityProduct
		>({
			query: ({ supplierId, values, language }) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(supplierId),
				body: mapActivityProductGeneralToCreate(values, language)
			}),
			transformResponse: (response: TActivityProductReadBackend) =>
				mapActivityProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateActivityProduct: builder.mutation<
			IActivityProduct,
			IUpdateActivityProduct
		>({
			query: ({ supplierId, productId, values, language }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapActivityProductGeneralToUpdate(values, language)
			}),
			transformResponse: (response: TActivityProductReadBackend) =>
				mapActivityProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		createActivityVariant: builder.mutation<
			IActivityVariant,
			ICreateActivityVariant
		>({
			query: ({ supplierId, productId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.createVariant(supplierId, productId),
				body: mapActivityVariantToWrite(data)
			}),
			transformResponse: (response: TActivityVariantReadBackend) =>
				mapActivityVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateActivityVariant: builder.mutation<
			IActivityVariant,
			IUpdateActivityVariant
		>({
			query: ({ supplierId, productId, variantId, data }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateVariant(
					supplierId,
					productId,
					variantId
				),
				body: mapActivityVariantToWrite(data)
			}),
			transformResponse: (response: TActivityVariantReadBackend) =>
				mapActivityVariantFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		deleteActivityVariant: builder.mutation<void, IDeleteActivityVariant>({
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
	useUpdateHotelProductMutation,
	useCreateTrainProductMutation,
	useUpdateTrainProductMutation,
	useDeleteSupplierProductMutation,
	useCreateHotelVariantMutation,
	useUpdateHotelVariantMutation,
	useDeleteHotelVariantMutation,
	useCreateTrainVariantMutation,
	useUpdateTrainVariantMutation,
	useDeleteTrainVariantMutation,
	useCreateFlightProductMutation,
	useUpdateFlightProductMutation,
	useCreateFlightVariantMutation,
	useUpdateFlightVariantMutation,
	useDeleteFlightVariantMutation,
	useCreateBusProductMutation,
	useUpdateBusProductMutation,
	useCreateBusVariantMutation,
	useUpdateBusVariantMutation,
	useDeleteBusVariantMutation,
	useCreateTransferProductMutation,
	useUpdateTransferProductMutation,
	useCreateTransferVariantMutation,
	useUpdateTransferVariantMutation,
	useDeleteTransferVariantMutation,
	useCreateActivityProductMutation,
	useUpdateActivityProductMutation,
	useCreateActivityVariantMutation,
	useUpdateActivityVariantMutation,
	useDeleteActivityVariantMutation,
	useListProductImagesQuery,
	useUploadProductImagesMutation,
	useSetPrimaryProductImageMutation,
	useDeleteProductImageMutation,
	useUploadNodeImagesMutation,
	useSetPrimaryNodeImageMutation,
	useDeleteNodeImageMutation
} = supplierProductApi;
