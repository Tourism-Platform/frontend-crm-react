import type {
	ActivityDetailsSchemaInput,
	ActivityDetailsSchemaOutput,
	ActivityFoodDetailsSchemaInput,
	ActivityFoodDetailsSchemaOutput,
	InheritedActivityDetailsInput,
	InheritedActivityDetailsOutput
} from "@/shared/api";

export type TActivityDetailsBackend =
	| ActivityDetailsSchemaOutput
	| ActivityFoodDetailsSchemaOutput;

export type TInheritedActivityDetailsBackend = InheritedActivityDetailsOutput;
export type TActivityEventDetailsBackend =
	| TActivityDetailsBackend
	| TInheritedActivityDetailsBackend;

export type TActivityDetailsInputBackend =
	| ActivityDetailsSchemaInput
	| ActivityFoodDetailsSchemaInput
	| InheritedActivityDetailsInput;
