import type { IPaginationRequest } from "@/shared/types";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "./supplier-type.types";

export interface ISupplier {
	id: string;
	brandName: string;
	legalName: string | null;
	phone: string | null;
	website: string | null;
	logoPath: string | null;
	supplierTypes: ENUM_SUPPLIER_TYPE_TYPE[];
}

export interface ISupplierCreate {
	brandName: string;
	legalName?: string | null;
	phone?: string | null;
	website?: string | null;
	supplierTypes: ENUM_SUPPLIER_TYPE_TYPE[];
}

export interface ISupplierUpdate {
	brandName?: string;
	legalName?: string | null;
	phone?: string | null;
	website?: string | null;
	supplierTypes?: ENUM_SUPPLIER_TYPE_TYPE[];
}

export interface ISupplierFilters extends Omit<IPaginationRequest, "status"> {
	supplierType?: ENUM_SUPPLIER_TYPE_TYPE;
}

export interface IGetSupplier {
	supplierId: string;
}

export interface ICreateSupplier {
	data: ISupplierCreate;
}

export interface IUpdateSupplier {
	supplierId: string;
	data: ISupplierUpdate;
}

export interface IDeleteSupplier {
	supplierId: string;
}

export interface IUploadSupplierLogo {
	supplierId: string;
	file: File;
}

export interface IDeleteSupplierLogo {
	supplierId: string;
}
