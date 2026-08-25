import type {
	ActivityDetailsSchemaInput,
	ActivityDetailsSchemaOutput,
	ActivityFoodDetailsSchemaInput,
	ActivityFoodDetailsSchemaOutput
} from "@/shared/api";

export type TActivityDetailsBackend =
	| ActivityDetailsSchemaOutput
	| ActivityFoodDetailsSchemaOutput;

export type TActivityDetailsInputBackend =
	| ActivityDetailsSchemaInput
	| ActivityFoodDetailsSchemaInput;
