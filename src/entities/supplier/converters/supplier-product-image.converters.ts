import type {
	ISupplierNodeImage,
	ISupplierProductImage,
	TSupplierNodeImageBackend,
	TSupplierProductImageBackend
} from "../types";

export const mapSupplierProductImageToFrontend = (
	row: TSupplierProductImageBackend
): ISupplierProductImage => ({
	id: row.id,
	productId: row.product_id,
	imagePath: row.image_path,
	isPrimary: row.is_primary
});

export const mapSupplierNodeImageToFrontend = (
	row: TSupplierNodeImageBackend
): ISupplierNodeImage => ({
	id: row.id ?? "",
	imagePath: row.image_path,
	isPrimary: row.is_primary ?? false
});
