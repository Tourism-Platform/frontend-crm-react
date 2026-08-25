import type {
	ISupplierProductFilters,
	TListSupplierProductsQueryBackend
} from "../types";

import { supplierTypeConverter } from "./supplier-type.converters";

export const mapSupplierProductFiltersToBackend = (
	filters: ISupplierProductFilters
): TListSupplierProductsQueryBackend => ({
	...(filters.page > 1 && { skip: (filters.page - 1) * filters.limit }),
	...(filters.limit && { limit: filters.limit }),
	...(!!filters.search?.trim().length && { q: filters.search.trim() }),
	...(filters.supplierId && { supplier_id: filters.supplierId }),
	...(filters.typ && { typ: supplierTypeConverter.to(filters.typ) })
});
