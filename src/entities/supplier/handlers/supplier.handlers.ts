import { HttpResponse } from "msw";

import {
	SUPPLIER_PATHS,
	SUPPLIER_PRODUCT_PATHS,
	createMockHandler,
	mockFileResponse,
	mockImageUrl,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	readFormFiles,
	toListResponse
} from "@/shared/api";

import {
	addProductImages,
	createProduct,
	createSupplier,
	createVariant,
	deleteProduct,
	deleteProductImage,
	deleteSupplier,
	deleteVariant,
	findProductNode,
	getProduct,
	getSupplier,
	listProductImages,
	listProducts,
	listSuppliers,
	nextImageId,
	searchSuppliers,
	setPrimaryProductImage,
	setSupplierLogo,
	switchProductPricing,
	updateProduct,
	updateSupplier,
	updateVariant
} from "../mock/supplier.store";

const SUPPLIER_NOT_FOUND = "Supplier not found";
const PRODUCT_NOT_FOUND = "Product not found";

type TParams = Record<string, unknown>;
type TProduct = NonNullable<ReturnType<typeof getProduct>>;

const json = (data: unknown) =>
	data === undefined
		? mockNotFound(PRODUCT_NOT_FOUND)
		: HttpResponse.json(data);

const withSupplier = (
	supplierId: unknown,
	resolve: (id: string) => Response
) =>
	getSupplier(String(supplierId))
		? resolve(String(supplierId))
		: mockNotFound(SUPPLIER_NOT_FOUND);

const withProduct = (
	params: TParams,
	resolve: (product: TProduct) => Response
) => {
	const product = getProduct(
		String(params.supplierId),
		String(params.productId)
	);
	return product ? resolve(product) : mockNotFound(PRODUCT_NOT_FOUND);
};

type TImageNode = {
	images?: { id?: string; image_path: string; is_primary?: boolean }[];
};

const withNode = (params: TParams, resolve: (node: TImageNode) => Response) =>
	withProduct(params, (product) => {
		const node = findProductNode(product, String(params.nodeId)) as
			| TImageNode
			| undefined;
		if (!node) return mockNotFound("Node not found");
		node.images ??= [];
		return resolve(node);
	});

const PRODUCT_PATH_ARGS = [":supplierId", ":productId"] as const;
const NODE_PATH_ARGS = [
	":supplierId",
	":productId",
	":variantId",
	":nodeId",
	":imageId"
] as const;

export const supplierHandlers = [
	createMockHandler(SUPPLIER_PATHS.listSuppliers, ({ query }) =>
		HttpResponse.json(
			toListResponse(
				listSuppliers({
					q: query.get("q"),
					supplierType: query.get("supplier_type")
				}),
				query
			)
		)
	),

	createMockHandler(SUPPLIER_PATHS.createSupplier, ({ body }) =>
		body.brand_name?.trim()
			? HttpResponse.json(createSupplier(body), { status: 201 })
			: mockValidationError(["body", "brand_name"], "Field required")
	),

	createMockHandler(SUPPLIER_PATHS.search, ({ query }) =>
		HttpResponse.json(
			searchSuppliers(
				query.get("q"),
				query.get("typ"),
				Number(query.get("limit") ?? 20)
			)
		)
	),

	createMockHandler(SUPPLIER_PRODUCT_PATHS.listAllProducts, ({ query }) =>
		HttpResponse.json(
			toListResponse(
				listProducts({
					q: query.get("q"),
					supplierId: query.get("supplier_id"),
					typ: query.get("typ")
				}),
				query
			)
		)
	),

	createMockHandler(SUPPLIER_PATHS.getSupplier(":supplierId"), ({ params }) =>
		withSupplier(params.supplierId, (id) =>
			HttpResponse.json(getSupplier(id))
		)
	),

	createMockHandler(
		SUPPLIER_PATHS.updateSupplier(":supplierId"),
		({ params, body }) =>
			withSupplier(params.supplierId, (id) =>
				HttpResponse.json(updateSupplier(id, body))
			)
	),

	createMockHandler(
		SUPPLIER_PATHS.deleteSupplier(":supplierId"),
		({ params }) =>
			withSupplier(params.supplierId, (id) => {
				deleteSupplier(id);
				return mockNoContent();
			})
	),

	createMockHandler(SUPPLIER_PATHS.getLogo(":supplierId"), ({ params }) =>
		withSupplier(params.supplierId, () =>
			mockFileResponse("logo.png", "image/png")
		)
	),

	createMockHandler(SUPPLIER_PATHS.addLogo(":supplierId"), ({ params }) =>
		withSupplier(params.supplierId, (id) =>
			HttpResponse.json(setSupplierLogo(id, true))
		)
	),

	createMockHandler(SUPPLIER_PATHS.deleteLogo(":supplierId"), ({ params }) =>
		withSupplier(params.supplierId, (id) => {
			setSupplierLogo(id, false);
			return mockNoContent();
		})
	),

	// --- Продукты ---

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.listSupplierProducts(":supplierId"),
		({ params, query }) =>
			withSupplier(params.supplierId, (id) =>
				HttpResponse.json(
					toListResponse(
						listProducts({
							q: query.get("q"),
							supplierId: id,
							typ: query.get("typ")
						}),
						query
					)
				)
			)
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.createProduct(":supplierId"),
		({ params, body }) =>
			withSupplier(params.supplierId, (id) =>
				body.typ && body.details
					? HttpResponse.json(createProduct(id, body), {
							status: 201
						})
					: mockValidationError(["body", "details"], "Field required")
			)
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.getProduct(...PRODUCT_PATH_ARGS),
		({ params }) =>
			withProduct(params, (product) => HttpResponse.json(product))
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.updateProduct(...PRODUCT_PATH_ARGS),
		({ params, body }) =>
			json(
				updateProduct(
					String(params.supplierId),
					String(params.productId),
					body
				)
			)
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.deleteProduct(...PRODUCT_PATH_ARGS),
		({ params }) =>
			deleteProduct(String(params.supplierId), String(params.productId))
				? mockNoContent()
				: mockNotFound(PRODUCT_NOT_FOUND)
	),

	// Связи продукта с турами в моке не отслеживаются
	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.listProductLinks(...PRODUCT_PATH_ARGS),
		({ params }) => withProduct(params, () => HttpResponse.json([]))
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.switchProductPricing(...PRODUCT_PATH_ARGS),
		({ params, body }) =>
			json(
				switchProductPricing(
					String(params.supplierId),
					String(params.productId),
					body
				)
			)
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.createVariant(...PRODUCT_PATH_ARGS),
		({ params, body }) => {
			const created = createVariant(
				String(params.supplierId),
				String(params.productId),
				body
			);
			return created
				? HttpResponse.json(created, { status: 201 })
				: mockNotFound(PRODUCT_NOT_FOUND);
		}
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.updateVariant(
			...PRODUCT_PATH_ARGS,
			":variantId"
		),
		({ params, body }) =>
			json(
				updateVariant(
					String(params.supplierId),
					String(params.productId),
					String(params.variantId),
					body
				)
			)
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.deleteVariant(
			...PRODUCT_PATH_ARGS,
			":variantId"
		),
		({ params }) =>
			deleteVariant(
				String(params.supplierId),
				String(params.productId),
				String(params.variantId)
			)
				? mockNoContent()
				: mockNotFound("Variant not found")
	),

	// --- Картинки продукта ---

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.uploadProductImages(...PRODUCT_PATH_ARGS),
		async ({ params, request }) => {
			const files = await readFormFiles(request);
			return withProduct(params, (product) =>
				HttpResponse.json(addProductImages(product, files.length), {
					status: 201
				})
			);
		}
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.listProductImages(...PRODUCT_PATH_ARGS),
		({ params }) =>
			withProduct(params, (product) =>
				HttpResponse.json(listProductImages(product.id))
			)
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.deleteProductImage(
			...PRODUCT_PATH_ARGS,
			":imageId"
		),
		({ params }) =>
			withProduct(params, (product) =>
				deleteProductImage(product, String(params.imageId))
					? mockNoContent()
					: mockNotFound("Image not found")
			)
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.setPrimaryProductImage(
			...PRODUCT_PATH_ARGS,
			":imageId"
		),
		({ params }) =>
			withProduct(params, (product) =>
				setPrimaryProductImage(product, String(params.imageId))
					? mockNoContent()
					: mockNotFound("Image not found")
			)
	),

	// --- Картинки узлов (комнаты, машины, тарифы) ---

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.uploadNodeImages(
			":supplierId",
			":productId",
			":variantId",
			":nodeId"
		),
		({ params }) =>
			withNode(params, (node) => {
				const id = nextImageId();
				const image = {
					id,
					image_path: mockImageUrl(`node-image-${id}`),
					is_primary: node.images?.length === 0
				};
				node.images?.push(image);
				return HttpResponse.json([image], { status: 201 });
			})
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.deleteNodeImage(...NODE_PATH_ARGS),
		({ params }) =>
			withNode(params, (node) => {
				node.images = node.images?.filter(
					(image) => image.id !== params.imageId
				);
				return mockNoContent();
			})
	),

	createMockHandler(
		SUPPLIER_PRODUCT_PATHS.setPrimaryNodeImageRoute(...NODE_PATH_ARGS),
		({ params }) =>
			withNode(params, (node) => {
				node.images?.forEach((image) => {
					image.is_primary = image.id === params.imageId;
				});
				return mockNoContent();
			})
	)
];
