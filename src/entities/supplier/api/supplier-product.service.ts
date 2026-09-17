import { ENUM_API_TAGS } from "@/shared/api/backend/tags.config";
import type { VariantCreated } from "@/shared/api/generated/Api";
import { SUPPLIER_PRODUCT_PATHS } from "@/shared/api/generated/paths/supplier-product.paths";
import type { IPaginationResponse } from "@/shared/types";

import { authApi } from "@/entities/auth/api/auth.api";

import {
	mapSupplierNodeImageToFrontend,
	mapSupplierProductEditFormToPricingSwitch,
	mapSupplierProductFiltersToBackend,
	mapSupplierProductFromBackend,
	mapSupplierProductGeneralToCreate,
	mapSupplierProductGeneralToUpdate,
	mapSupplierProductImageToFrontend,
	mapSupplierProductListToFrontend,
	mapSupplierProductReadToEditForm,
	mapSupplierVariantFormToWrite,
	mapSupplierVariantToWrite
} from "../converters";
import type {
	IDeleteNodeImage,
	IDeleteProductImage,
	IDeleteSupplierProduct,
	IDeleteSupplierVariant,
	IGetSupplierProduct,
	IListProductImages,
	ISetPrimaryNodeImage,
	ISetPrimaryProductImage,
	ISupplierNodeImage,
	ISupplierProductFilters,
	ISupplierProductImage,
	ISupplierVariantCreated,
	IUploadNodeImages,
	IUploadProductImages,
	TCreateSupplierProduct,
	TCreateSupplierVariant,
	TSupplierNodeImageBackend,
	TSupplierProduct,
	TSupplierProductEditForm,
	TSupplierProductImageBackend,
	TSupplierProductListBackend,
	TSupplierProductReadBackend,
	TSupplierVariantProductReadBackend,
	TSwitchSupplierProductPricing,
	TUpdateSupplierProduct,
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
		getSupplierProductForm: builder.query<
			TSupplierProductEditForm,
			IGetSupplierProduct
		>({
			query: ({ supplierId, productId }) => ({
				...SUPPLIER_PRODUCT_PATHS.getProduct(supplierId, productId)
			}),
			transformResponse: (response: TSupplierProductReadBackend) =>
				mapSupplierProductReadToEditForm(response),
			providesTags: (_result, _error, { productId }) => [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: productId }
			]
		}),
		createSupplierProduct: builder.mutation<
			TSupplierProduct,
			TCreateSupplierProduct
		>({
			query: (input) => ({
				...SUPPLIER_PRODUCT_PATHS.createProduct(input.supplierId),
				body: mapSupplierProductGeneralToCreate(input)
			}),
			transformResponse: (response: TSupplierProductReadBackend) =>
				mapSupplierProductFromBackend(response),
			invalidatesTags: [
				{ type: ENUM_API_TAGS.SUPPLIER_PRODUCTS, id: "LIST" }
			]
		}),
		updateSupplierProduct: builder.mutation<
			TSupplierProduct,
			TUpdateSupplierProduct
		>({
			query: (input) => ({
				...SUPPLIER_PRODUCT_PATHS.updateProduct(
					input.supplierId,
					input.productId
				),
				body: mapSupplierProductGeneralToUpdate(input)
			}),
			transformResponse: (response: TSupplierProductReadBackend) =>
				mapSupplierProductFromBackend(response),
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
		switchSupplierProductPricing: builder.mutation<
			TSupplierProduct,
			TSwitchSupplierProductPricing
		>({
			query: (input) => ({
				...SUPPLIER_PRODUCT_PATHS.switchProductPricing(
					input.supplierId,
					input.productId
				),
				body: mapSupplierProductEditFormToPricingSwitch(input)
			}),
			transformResponse: (response: TSupplierProductReadBackend) =>
				mapSupplierProductFromBackend(response),
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
			query: (input) => ({
				...SUPPLIER_PRODUCT_PATHS.updateVariant(
					input.supplierId,
					input.productId,
					input.variantId
				),
				body: mapSupplierVariantToWrite(
					mapSupplierVariantFormToWrite(input)
				)
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
	useGetSupplierProductFormQuery,
	useLazyGetSupplierProductQuery,
	useCreateSupplierProductMutation,
	useUpdateSupplierProductMutation,
	useDeleteSupplierProductMutation,
	useSwitchSupplierProductPricingMutation,
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
