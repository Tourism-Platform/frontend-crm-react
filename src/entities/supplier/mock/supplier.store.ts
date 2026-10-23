import type {
	SupplierCreateSchema,
	SupplierModel,
	SupplierProductImageModel,
	SupplierUpdateSchema
} from "@/shared/api";
import {
	createMockIdSequence,
	matchesQuery,
	mockImageUrl,
	omitKeys
} from "@/shared/api";

import { MOCK_TOUR_OPERATOR_ID } from "@/entities/tour/tour/mock/tour.mock";

import type {
	TCreateProductBodyBackend,
	TSupplierProductReadBackend,
	TSupplierVariantWriteBackend,
	TSwitchProductPricingBodyBackend,
	TUpdateProductBodyBackend
} from "../types";

import {
	SUPPLIERS_MOCK,
	SUPPLIER_PRODUCTS_MOCK,
	SUPPLIER_VARIANT_SEED_COUNT
} from "./supplier.mock";

type TProduct = TSupplierProductReadBackend;
type TSpec = Record<string, unknown>;

/** Сгенерированные union-типы spec не индексируются по строке — работаем как с объектом */
const asSpec = (value: unknown) => value as TSpec;

/** Поле spec, где лежат варианты продукта, по типу продукта */
const VARIANT_KEYS: Record<TProduct["typ"], string> = {
	activity: "offerings",
	hotel: "categories",
	flight: "fares",
	train: "fares",
	bus: "vehicles",
	transfer: "cars"
};

/** Тип продукта → тип поставщика */
export const PRODUCT_SUPPLIER_TYPE: Record<TProduct["typ"], string> = {
	activity: "activity",
	hotel: "hotel",
	flight: "flight",
	train: "train",
	bus: "bus",
	transfer: "transfer"
};

const createSupplierStore = () =>
	new Map(
		SUPPLIERS_MOCK.map((supplier) => [
			supplier.id,
			structuredClone(supplier)
		])
	);
const createProductStore = () =>
	new Map(
		SUPPLIER_PRODUCTS_MOCK.map((product) => [
			product.id,
			structuredClone(product)
		])
	);
const createProductImagesStore = () =>
	new Map<string, SupplierProductImageModel[]>(
		SUPPLIER_PRODUCTS_MOCK.map((product) => [
			product.id,
			product.image_paths.map((imagePath) => ({
				id: product.id.replace("-c110-", "-c131-"),
				image_path: imagePath,
				is_primary: true,
				product_id: product.id
			}))
		])
	);

let supplierStore = createSupplierStore();
let productStore = createProductStore();
let productImagesStore = createProductImagesStore();

const supplierIds = createMockIdSequence("c100", SUPPLIERS_MOCK.length + 1);
const productIds = createMockIdSequence(
	"c110",
	SUPPLIER_PRODUCTS_MOCK.length + 1
);
const variantIds = createMockIdSequence(
	"c120",
	SUPPLIER_VARIANT_SEED_COUNT + 1
);
const imageIds = createMockIdSequence("c130", 1);

/** Проставляет id объектам в массивах (варианты, комнаты, тарифы), где его нет */
const withIds = <T>(value: T): T => {
	if (Array.isArray(value)) {
		return value.map((item) =>
			item && typeof item === "object" && !Array.isArray(item)
				? { id: variantIds.next(), ...withIds(item) }
				: withIds(item)
		) as T;
	}
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [key, withIds(item)])
		) as T;
	}
	return value;
};

const toSpec = (details: TSpec): TSpec => ({
	images: [],
	name: null,
	...withIds(omitKeys(details, ["typ"]))
});

// --- Поставщики ---

interface ISupplierFilter {
	q: string | null;
	supplierType: string | null;
}

export const listSuppliers = ({ q, supplierType }: ISupplierFilter) =>
	[...supplierStore.values()].filter(
		(supplier) =>
			!supplier.deleted_at &&
			matchesQuery(q, supplier.brand_name, supplier.legal_name) &&
			(!supplierType ||
				supplier.supplier_types.includes(supplierType as never))
	);

export const getSupplier = (supplierId: string) => {
	const supplier = supplierStore.get(supplierId);
	return supplier && !supplier.deleted_at ? supplier : undefined;
};

export const createSupplier = (body: SupplierCreateSchema): SupplierModel => {
	const supplier: SupplierModel = {
		id: supplierIds.next(),
		operator_id: MOCK_TOUR_OPERATOR_ID,
		brand_name: body.brand_name,
		legal_name: body.legal_name ?? null,
		phone: body.phone ?? null,
		website: body.website ?? null,
		logo_path: null,
		supplier_types: [],
		deleted_at: null
	};
	supplierStore.set(supplier.id, supplier);
	return supplier;
};

export const updateSupplier = (
	supplierId: string,
	body: SupplierUpdateSchema
) => {
	const supplier = getSupplier(supplierId);
	if (!supplier) return undefined;

	for (const [key, value] of Object.entries(body)) {
		if (value === undefined || (key === "brand_name" && value === null)) {
			continue;
		}
		Object.assign(supplier, { [key]: value });
	}
	return supplier;
};

export const deleteSupplier = (supplierId: string) => {
	const supplier = getSupplier(supplierId);
	if (!supplier) return false;
	supplier.deleted_at = new Date().toISOString();
	return true;
};

export const setSupplierLogo = (supplierId: string, hasLogo: boolean) => {
	const supplier = getSupplier(supplierId);
	if (!supplier) return undefined;
	supplier.logo_path = hasLogo
		? mockImageUrl(`supplier-logo-${supplierId}-${Date.now()}`, 200, 200)
		: null;
	return supplier;
};

// --- Продукты ---

interface IProductFilter {
	q: string | null;
	supplierId: string | null;
	typ: string | null;
}

export const listProducts = ({ q, supplierId, typ }: IProductFilter) =>
	[...productStore.values()].filter(
		(product) =>
			Boolean(getSupplier(product.supplier_id)) &&
			(!supplierId || product.supplier_id === supplierId) &&
			(!typ || PRODUCT_SUPPLIER_TYPE[product.typ] === typ) &&
			matchesQuery(q, product.name, product.supplier_name)
	);

/** Поиск для автокомплита: поставщики и их продукты */
export const searchSuppliers = (
	q: string | null,
	typ: string | null,
	limit: number
) => {
	const supplierHits = listSuppliers({ q, supplierType: typ }).map(
		(supplier) => ({
			kind: "supplier",
			id: supplier.id,
			name: supplier.brand_name,
			supplier_id: supplier.id,
			supplier_name: supplier.brand_name,
			product_id: null,
			product_name: null,
			typ: supplier.supplier_types[0] ?? null
		})
	);
	const productHits = listProducts({ q, supplierId: null, typ }).map(
		(product) => ({
			kind: "product",
			id: product.id,
			name: product.name,
			supplier_id: product.supplier_id,
			supplier_name: product.supplier_name ?? "",
			product_id: product.id,
			product_name: product.name,
			typ: PRODUCT_SUPPLIER_TYPE[product.typ]
		})
	);
	return [...supplierHits, ...productHits].slice(0, limit);
};

export const getProduct = (supplierId: string, productId: string) => {
	const product = productStore.get(productId);
	return product?.supplier_id === supplierId ? product : undefined;
};

/** Продукт по id без привязки к поставщику (для product-supply в турах) */
export const findProduct = (productId: string) => productStore.get(productId);

export const createProduct = (
	supplierId: string,
	body: TCreateProductBodyBackend
) => {
	const supplier = getSupplier(supplierId);
	if (!supplier) return undefined;

	const details = asSpec(body.details);
	const product = {
		id: productIds.next(),
		supplier_id: supplier.id,
		supplier_name: supplier.brand_name,
		name: String(details.name ?? "New product"),
		image_paths: [],
		primary_image_path: null,
		typ: body.typ,
		spec: toSpec(details)
	} as unknown as TProduct;

	productStore.set(product.id, product);
	productImagesStore.set(product.id, []);
	const supplierType = PRODUCT_SUPPLIER_TYPE[product.typ] as never;
	if (!supplier.supplier_types.includes(supplierType)) {
		supplier.supplier_types.push(supplierType);
	}
	return product;
};

export const updateProduct = (
	supplierId: string,
	productId: string,
	body: TUpdateProductBodyBackend
) => {
	const product = getProduct(supplierId, productId);
	if (!product) return undefined;
	if (!body.details) return product;

	const details = asSpec(body.details);
	// Варианты меняются отдельными методами — общий PATCH их не трогает
	Object.assign(
		asSpec(product.spec),
		omitKeys(toSpec(details), [VARIANT_KEYS[product.typ]])
	);
	if (typeof details.name === "string") product.name = details.name;
	return product;
};

export const deleteProduct = (supplierId: string, productId: string) =>
	Boolean(getProduct(supplierId, productId)) &&
	productStore.delete(productId);

export const switchProductPricing = (
	supplierId: string,
	productId: string,
	body: TSwitchProductPricingBodyBackend
) => {
	const product = getProduct(supplierId, productId);
	if (!product) return undefined;

	const { to, ...rest } = asSpec(body) as TSpec & { to: string };
	Object.assign(asSpec(product.spec), withIds(omitKeys(rest, ["typ"])), {
		pricing: to
	});
	return product;
};

const getVariants = (product: TProduct) => {
	const spec = asSpec(product.spec);
	const key = VARIANT_KEYS[product.typ];
	if (!Array.isArray(spec[key])) spec[key] = [];
	return spec[key] as { id: string }[];
};

export const createVariant = (
	supplierId: string,
	productId: string,
	body: TSupplierVariantWriteBackend
) => {
	const product = getProduct(supplierId, productId);
	if (!product) return undefined;

	const variant = omitKeys(asSpec(body), ["typ"]);
	const created = { images: [], ...withIds(variant), id: variantIds.next() };
	getVariants(product).push(created);
	return { variant_id: created.id, product };
};

export const updateVariant = (
	supplierId: string,
	productId: string,
	variantId: string,
	body: TSupplierVariantWriteBackend
) => {
	const product = getProduct(supplierId, productId);
	const variant =
		product && getVariants(product).find((item) => item.id === variantId);
	if (!product || !variant) return undefined;

	Object.assign(variant, withIds(omitKeys(asSpec(body), ["typ"])), {
		id: variantId
	});
	return product;
};

export const deleteVariant = (
	supplierId: string,
	productId: string,
	variantId: string
) => {
	const product = getProduct(supplierId, productId);
	if (!product) return false;

	const variants = getVariants(product);
	const index = variants.findIndex((item) => item.id === variantId);
	if (index === -1) return false;
	variants.splice(index, 1);
	return true;
};

// --- Картинки продукта ---

const syncProductImages = (product: TProduct) => {
	const images = productImagesStore.get(product.id) ?? [];
	product.image_paths = images.map((image) => image.image_path);
	product.primary_image_path =
		images.find((image) => image.is_primary)?.image_path ?? null;
};

export const listProductImages = (productId: string) =>
	productImagesStore.get(productId) ?? [];

export const addProductImages = (product: TProduct, count: number) => {
	const images = productImagesStore.get(product.id) ?? [];
	const hadImages = images.length > 0;
	const created = Array.from({ length: Math.max(count, 1) }, (_, index) => {
		const id = imageIds.next();
		return {
			id,
			image_path: mockImageUrl(`product-image-${id}`),
			is_primary: !hadImages && index === 0,
			product_id: product.id
		};
	});
	images.push(...created);
	productImagesStore.set(product.id, images);
	syncProductImages(product);
	return created;
};

export const deleteProductImage = (product: TProduct, imageId: string) => {
	const images = productImagesStore.get(product.id) ?? [];
	const next = images.filter((image) => image.id !== imageId);
	if (next.length === images.length) return false;
	if (next.length && !next.some((image) => image.is_primary)) {
		next[0].is_primary = true;
	}
	productImagesStore.set(product.id, next);
	syncProductImages(product);
	return true;
};

export const setPrimaryProductImage = (product: TProduct, imageId: string) => {
	const images = productImagesStore.get(product.id) ?? [];
	if (!images.some((image) => image.id === imageId)) return false;
	images.forEach((image) => {
		image.is_primary = image.id === imageId;
	});
	syncProductImages(product);
	return true;
};

/** Узел spec с id (комната, машина, тариф) — для картинок узлов */
export const findProductNode = (product: TProduct, nodeId: string) => {
	const visit = (value: unknown): TSpec | undefined => {
		if (Array.isArray(value)) {
			for (const item of value) {
				const found = visit(item);
				if (found) return found;
			}
		} else if (value && typeof value === "object") {
			const node = asSpec(value);
			if (node.id === nodeId) return node;
			for (const item of Object.values(node)) {
				const found = visit(item);
				if (found) return found;
			}
		}
		return undefined;
	};
	return visit(product.spec);
};

export const nextImageId = () => imageIds.next();

export const resetSupplierStore = () => {
	supplierStore = createSupplierStore();
	productStore = createProductStore();
	productImagesStore = createProductImagesStore();
	supplierIds.reset(SUPPLIERS_MOCK.length + 1);
	productIds.reset(SUPPLIER_PRODUCTS_MOCK.length + 1);
	variantIds.reset(SUPPLIER_VARIANT_SEED_COUNT + 1);
	imageIds.reset(1);
};
