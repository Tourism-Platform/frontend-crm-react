import type { IPaginationResponse } from "@/shared/types";

import type {
	ISupplier,
	ISupplierCreate,
	ISupplierFilters,
	ISupplierUpdate,
	TListSuppliersQueryBackend,
	TSupplierBackend,
	TSupplierCreateBackend,
	TSupplierListBackend,
	TSupplierUpdateBackend
} from "../types";

import { supplierTypeConverter } from "./supplier-type.converters";

export const mapSupplierFromBackend = (row: TSupplierBackend): ISupplier => ({
	id: row.id,
	brandName: row.brand_name,
	legalName: row.legal_name,
	phone: row.phone,
	website: row.website,
	logoPath: row.logo_path,
	supplierTypes: supplierTypeConverter.fromMany(row.supplier_types)
});

export const mapSupplierListToFrontend = (
	response: TSupplierListBackend
): IPaginationResponse<ISupplier> => ({
	data: response.data.map(mapSupplierFromBackend),
	total: response.total_count
});

export const mapSupplierToCreate = (
	data: ISupplierCreate
): TSupplierCreateBackend => ({
	brand_name: data.brandName,
	legal_name: data.legalName?.trim() || null,
	phone: data.phone?.trim() || null,
	website: data.website?.trim() || null
});

export const mapSupplierToUpdate = (
	data: ISupplierUpdate
): TSupplierUpdateBackend => ({
	...(data.brandName !== undefined && { brand_name: data.brandName }),
	...(data.legalName !== undefined && {
		legal_name: data.legalName?.trim() || null
	}),
	...(data.phone !== undefined && { phone: data.phone?.trim() || null }),
	...(data.website !== undefined && {
		website: data.website?.trim() || null
	})
});

export const mapSupplierFiltersToBackend = (
	filters: ISupplierFilters
): TListSuppliersQueryBackend => ({
	...(filters.page > 1 && { skip: (filters.page - 1) * filters.limit }),
	...(filters.limit && { limit: filters.limit }),
	...(!!filters.search?.trim().length && { q: filters.search.trim() }),
	...(filters.supplierType && {
		supplier_type: supplierTypeConverter.to(filters.supplierType)
	})
});
