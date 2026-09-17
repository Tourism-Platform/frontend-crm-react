import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import type { VariantCreated } from "@/shared/api/generated/Api";
import { SUPPLIER_PRODUCT_PATHS } from "@/shared/api/generated/paths/supplier-product.paths";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapActivityProductFromBackend,
	mapActivityProductGeneralToCreate,
	mapActivityProductGeneralToUpdate,
	mapBusEditFormToPricingSwitch,
	mapBusProductFromBackend,
	mapBusProductGeneralToCreate,
	mapBusProductToUpdate,
	mapFlightEditFormToPricingSwitch,
	mapFlightProductFromBackend,
	mapFlightProductGeneralToCreate,
	mapFlightProductGeneralToUpdate,
	mapHotelEditFormToPricingSwitch,
	mapHotelProductFromBackend,
	mapHotelProductGeneralToCreate,
	mapHotelProductGeneralToUpdate,
	mapSupplierNodeImageToFrontend,
	mapSupplierProductFiltersToBackend,
	mapSupplierProductFromBackend,
	mapSupplierProductImageToFrontend,
	mapSupplierProductListToFrontend,
	mapSupplierVariantToWrite,
	mapTrainEditFormToPricingSwitch,
	mapTrainProductFromBackend,
	mapTrainProductGeneralToCreate,
	mapTrainProductGeneralToUpdate,
	mapTransferEditFormToPricingSwitch,
	mapTransferProductFromBackend,
	mapTransferProductGeneralToCreate,
	mapTransferProductToUpdate
} from "../converters";
import type {
	IActivityProduct,
	IBusProduct,
	ICreateActivityProduct,
	ICreateBusProduct,
	ICreateFlightProduct,
	ICreateHotelProduct,
	ICreateTrainProduct,
	ICreateTransferProduct,
	IDeleteNodeImage,
	IDeleteProductImage,
	IDeleteSupplierProduct,
	IDeleteSupplierVariant,
	IFlightProduct,
	IGetSupplierProduct,
	IHotelProduct,
	IListProductImages,
	ISetPrimaryNodeImage,
	ISetPrimaryProductImage,
	ISupplierNodeImage,
	ISupplierProductFilters,
	ISupplierProductImage,
	ISupplierVariantCreated,
	ISwitchBusProductPricing,
	ISwitchFlightProductPricing,
	ISwitchHotelProductPricing,
	ISwitchTrainProductPricing,
	ISwitchTransferProductPricing,
	ITrainProduct,
	ITransferProduct,
	IUpdateActivityProduct,
	IUpdateBusProduct,
	IUpdateFlightProduct,
	IUpdateHotelProduct,
	IUpdateTrainProduct,
	IUpdateTransferProduct,
	IUploadNodeImages,
	IUploadProductImages,
	TActivityProductReadBackend,
	TBusProductReadBackend,
	TCreateSupplierVariant,
	TFlightProductReadBackend,
	THotelProductReadBackend,
	TSupplierNodeImageBackend,
	TSupplierProduct,
	TSupplierProductImageBackend,
	TSupplierProductListBackend,
	TSupplierProductReadBackend,
	TSupplierVariantProductReadBackend,
	TTrainProductReadBackend,
	TTransferProductReadBackend,
	TUpdateSupplierVariant
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
			transformResponse: (response: TSupplierProductReadBackend) =>
				mapSupplierProductFromBackend(response),
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
			query: ({ supplierId, productId, values, language, existing }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapHotelProductGeneralToUpdate(values, existing, language)
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
			query: ({ supplierId, productId, values, language, existing }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapTrainProductGeneralToUpdate(values, existing, language)
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
			query: ({ supplierId, productId, values, language, existing }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(supplierId, productId),
				body: mapFlightProductGeneralToUpdate(
					values,
					existing,
					language
				)
			}),
			transformResponse: (response: TFlightProductReadBackend) =>
				mapFlightProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		switchFlightProductPricing: builder.mutation<
			IFlightProduct,
			ISwitchFlightProductPricing
		>({
			query: (data) => ({
				...SUPPLIER_PRODUCT_PATHS.switchProductPricing(
					data.supplierId,
					data.productId
				),
				body: mapFlightEditFormToPricingSwitch(data.values)
			}),
			transformResponse: (response: TFlightProductReadBackend) =>
				mapFlightProductFromBackend(response),
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
			query: (data) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(
					data.supplierId,
					data.productId
				),
				body: mapBusProductToUpdate(data)
			}),
			transformResponse: (response: TBusProductReadBackend) =>
				mapBusProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		switchBusProductPricing: builder.mutation<
			IBusProduct,
			ISwitchBusProductPricing
		>({
			query: (data) => ({
				...SUPPLIER_PRODUCT_PATHS.switchProductPricing(
					data.supplierId,
					data.productId
				),
				body: mapBusEditFormToPricingSwitch(data.values)
			}),
			transformResponse: (response: TBusProductReadBackend) =>
				mapBusProductFromBackend(response),
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
			query: (data) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(
					data.supplierId,
					data.productId
				),
				body: mapTransferProductToUpdate(data)
			}),
			transformResponse: (response: TTransferProductReadBackend) =>
				mapTransferProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		switchTransferProductPricing: builder.mutation<
			ITransferProduct,
			ISwitchTransferProductPricing
		>({
			query: (data) => ({
				...SUPPLIER_PRODUCT_PATHS.switchProductPricing(
					data.supplierId,
					data.productId
				),
				body: mapTransferEditFormToPricingSwitch(data.values)
			}),
			transformResponse: (response: TTransferProductReadBackend) =>
				mapTransferProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		switchTrainProductPricing: builder.mutation<
			ITrainProduct,
			ISwitchTrainProductPricing
		>({
			query: (data) => ({
				...SUPPLIER_PRODUCT_PATHS.switchProductPricing(
					data.supplierId,
					data.productId
				),
				body: mapTrainEditFormToPricingSwitch(data.values)
			}),
			transformResponse: (response: TTrainProductReadBackend) =>
				mapTrainProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		switchHotelProductPricing: builder.mutation<
			IHotelProduct,
			ISwitchHotelProductPricing
		>({
			query: (data) => ({
				...SUPPLIER_PRODUCT_PATHS.switchProductPricing(
					data.supplierId,
					data.productId
				),
				body: mapHotelEditFormToPricingSwitch(
					data.values,
					data.existing
				)
			}),
			transformResponse: (response: THotelProductReadBackend) =>
				mapHotelProductFromBackend(response),
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
		createVariant: builder.mutation<
			ISupplierVariantCreated,
			TCreateSupplierVariant
		>({
			query: ({ supplierId, productId, ...write }) => ({
				...SUPPLIER_PRODUCT_PATHS.createVariant(supplierId, productId),
				body: mapSupplierVariantToWrite(write)
			}),
			transformResponse: (
				response: VariantCreated
			): ISupplierVariantCreated => ({
				variantId: response.variant_id,
				product: mapSupplierProductFromBackend(response.product)
			}),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		updateVariant: builder.mutation<
			TSupplierProduct,
			TUpdateSupplierVariant
		>({
			query: ({ supplierId, productId, variantId, ...write }) => ({
				...SUPPLIER_PRODUCT_PATHS.updateVariant(
					supplierId,
					productId,
					variantId
				),
				body: mapSupplierVariantToWrite(write)
			}),
			transformResponse: (response: TSupplierVariantProductReadBackend) =>
				mapSupplierProductFromBackend(response),
			invalidatesTags: (_result, _error, { productId }) =>
				productInvalidateTags(productId)
		}),
		deleteVariant: builder.mutation<void, IDeleteSupplierVariant>({
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
	useCreateFlightProductMutation,
	useUpdateFlightProductMutation,
	useSwitchFlightProductPricingMutation,
	useCreateBusProductMutation,
	useUpdateBusProductMutation,
	useSwitchBusProductPricingMutation,
	useCreateTransferProductMutation,
	useUpdateTransferProductMutation,
	useSwitchTransferProductPricingMutation,
	useSwitchTrainProductPricingMutation,
	useSwitchHotelProductPricingMutation,
	useCreateActivityProductMutation,
	useUpdateActivityProductMutation,
	useCreateVariantMutation,
	useUpdateVariantMutation,
	useDeleteVariantMutation,
	useListProductImagesQuery,
	useUploadProductImagesMutation,
	useSetPrimaryProductImageMutation,
	useDeleteProductImageMutation,
	useUploadNodeImagesMutation,
	useSetPrimaryNodeImageMutation,
	useDeleteNodeImageMutation
} = supplierProductApi;
