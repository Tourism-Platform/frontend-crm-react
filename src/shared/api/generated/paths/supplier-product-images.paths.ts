import type {
	BodyUploadNodeImagesSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesPost,
	BodyUploadProductImagesSupplierSupplierIdProductProductIdImagesPost,
	NodeImageSchema,
	SupplierProductImageModel
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const SUPPLIER_PRODUCT_IMAGES_PATHS = {
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
