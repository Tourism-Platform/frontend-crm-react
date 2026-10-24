import type {
	RoomRateSwitch,
	SupplierUpdateSchema,
	VariantCreated
} from "@/shared/api";
import type {
	SupplierCreateSchema,
	SupplierListResponse,
	SupplierModel
} from "@/shared/api/generated/Api";
import type { SUPPLIER_PATHS } from "@/shared/api/generated/paths/supplier.paths";

export type TSupplierBackend = SupplierModel;
export type TSupplierCreateBackend = SupplierCreateSchema;
export type TSupplierUpdateBackend = ReturnType<
	typeof SUPPLIER_PATHS.updateSupplier
>["_types"]["body"];
export type TSupplierListBackend = SupplierListResponse;
export type TListSuppliersQueryBackend =
	(typeof SUPPLIER_PATHS.listSuppliers)["_types"]["query"];
export type TVariantCreatedBackend = VariantCreated;
export type TRoomRateSwitchBackend = RoomRateSwitch;
export type TSupplierUpdateSchemaBackend = SupplierUpdateSchema;
