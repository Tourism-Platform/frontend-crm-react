import type {
	BodyAddLogoSupplierSupplierIdLogoPost,
	EventTypes,
	SupplierCreateSchema,
	SupplierListResponse,
	SupplierModel,
	SupplierUpdateSchema
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const SUPPLIER_PATHS = {
	listSuppliers: {
		url: "/supplier",
		method: "GET",
		_types: {} as {
			body: void;
			query: { skip?: number; limit?: number; typ?: EventTypes | null };
			response: SupplierListResponse;
		}
	} as const,
	createSupplier: {
		url: "/supplier",
		method: "POST",
		_types: {} as {
			body: SupplierCreateSchema;
			query: void;
			response: SupplierModel;
		}
	} as const,
	getSupplier: (supplierId: string) =>
		({
			url: `/supplier/${supplierId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: SupplierModel }
		}) as const,
	updateSupplier: (supplierId: string) =>
		({
			url: `/supplier/${supplierId}`,
			method: "PATCH",
			_types: {} as {
				body: SupplierUpdateSchema;
				query: void;
				response: SupplierModel;
			}
		}) as const,
	deleteSupplier: (supplierId: string) =>
		({
			url: `/supplier/${supplierId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	getLogo: (supplierId: string) =>
		({
			url: `/supplier/${supplierId}/logo`,
			method: "GET",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	addLogo: (supplierId: string) =>
		({
			url: `/supplier/${supplierId}/logo`,
			method: "POST",
			_types: {} as {
				body: BodyAddLogoSupplierSupplierIdLogoPost;
				query: void;
				response: SupplierModel;
			}
		}) as const,
	deleteLogo: (supplierId: string) =>
		({
			url: `/supplier/${supplierId}/logo`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
