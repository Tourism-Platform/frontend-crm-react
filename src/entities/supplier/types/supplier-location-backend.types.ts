import type {
	LocationInSchema,
	LocationOutSchema,
	LocationRefSchema
} from "@/shared/api/generated/Api";

export type TLocationInBackend = LocationInSchema;
export type TSupplierLocationBackend =
	| LocationOutSchema
	| LocationRefSchema
	| LocationInSchema
	| null;
