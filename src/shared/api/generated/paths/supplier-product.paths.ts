import type {
	BodyUploadNodeImagesSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesPost,
	BodyUploadProductImagesSupplierSupplierIdProductProductIdImagesPost,
	HotelProductCreate,
	HotelProductReadOutput,
	HotelProductUpdate,
	HotelVariantReadOutput,
	HotelVariantWrite,
	NodeImageSchema,
	SupplierProductImageModel,
	SupplierProductListResponse,
	SupplierType,
	TrainProductCreate,
	TrainProductReadOutput,
	TrainProductUpdate,
	TrainVariantReadOutput,
	TrainVariantWrite
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const SUPPLIER_PRODUCT_PATHS = {
	listAllProducts: {
		url: "/supplier/product",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				supplier_id?: string | null;
				typ?: SupplierType | null;
				q?: string | null;
				skip?: number;
				limit?: number;
			};
			response: SupplierProductListResponse;
		}
	} as const,
	listSupplierProducts: (supplierId: string) =>
		({
			url: `/supplier/${supplierId}/product`,
			method: "GET",
			_types: {} as {
				body: void;
				query: {
					typ?: SupplierType | null;
					q?: string | null;
					skip?: number;
					limit?: number;
				};
				response: SupplierProductListResponse;
			}
		}) as const,
	createProduct: (supplierId: string) =>
		({
			url: `/supplier/${supplierId}/product`,
			method: "POST",
			_types: {} as {
				body: HotelProductCreate | TrainProductCreate;
				query: void;
				response: HotelProductReadOutput | TrainProductReadOutput;
			}
		}) as const,
	getProduct: (supplierId: string, productId: string) =>
		({
			url: `/supplier/${supplierId}/product/${productId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: HotelProductReadOutput | TrainProductReadOutput;
			}
		}) as const,
	updateProduct: (supplierId: string, productId: string) =>
		({
			url: `/supplier/${supplierId}/product/${productId}`,
			method: "PATCH",
			_types: {} as {
				body: HotelProductUpdate | TrainProductUpdate;
				query: void;
				response: HotelProductReadOutput | TrainProductReadOutput;
			}
		}) as const,
	deleteProduct: (supplierId: string, productId: string) =>
		({
			url: `/supplier/${supplierId}/product/${productId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	createVariant: (supplierId: string, productId: string) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/variant`,
			method: "POST",
			_types: {} as {
				body: HotelVariantWrite | TrainVariantWrite;
				query: void;
				response: HotelVariantReadOutput | TrainVariantReadOutput;
			}
		}) as const,
	updateVariant: (supplierId: string, productId: string, variantId: string) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/variant/${variantId}`,
			method: "PATCH",
			_types: {} as {
				body: HotelVariantWrite | TrainVariantWrite;
				query: void;
				response: HotelVariantReadOutput | TrainVariantReadOutput;
			}
		}) as const,
	deleteVariant: (supplierId: string, productId: string, variantId: string) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/variant/${variantId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	uploadProductImages: (supplierId: string, productId: string) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/images`,
			method: "POST",
			_types: {} as {
				body: BodyUploadProductImagesSupplierSupplierIdProductProductIdImagesPost;
				query: void;
				response: SupplierProductImageModel[];
			}
		}) as const,
	listProductImages: (supplierId: string, productId: string) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/images/all`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { skip?: number; limit?: number };
				response: SupplierProductImageModel[];
			}
		}) as const,
	deleteProductImage: (
		supplierId: string,
		productId: string,
		imageId: string
	) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/images/${imageId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	setPrimaryProductImage: (
		supplierId: string,
		productId: string,
		imageId: string
	) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/images/${imageId}/set-primary`,
			method: "PATCH",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	uploadNodeImages: (
		supplierId: string,
		productId: string,
		variantId: string,
		nodeId: string
	) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/variant/${variantId}/node/${nodeId}/images`,
			method: "POST",
			_types: {} as {
				body: BodyUploadNodeImagesSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesPost;
				query: void;
				response: NodeImageSchema[];
			}
		}) as const,
	deleteNodeImage: (
		supplierId: string,
		productId: string,
		variantId: string,
		nodeId: string,
		imageId: string
	) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/variant/${variantId}/node/${nodeId}/images/${imageId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	setPrimaryNodeImageRoute: (
		supplierId: string,
		productId: string,
		variantId: string,
		nodeId: string,
		imageId: string
	) =>
		({
			url: `/supplier/${supplierId}/product/${productId}/variant/${variantId}/node/${nodeId}/images/${imageId}/set-primary`,
			method: "PATCH",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
