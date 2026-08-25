import type {
	HousingOverrideSchemaInput,
	HousingOverrideSchemaOutput,
	TOUR_EVENTS_PATHS,
	TrainOverrideSchemaInput,
	TrainOverrideSchemaOutput
} from "@/shared/api";

export type TEventOverrideInputBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.setSingleEventOverride
>["_types"]["body"];

export type THousingOverrideInputBackend = HousingOverrideSchemaInput;
export type TTrainOverrideInputBackend = TrainOverrideSchemaInput;

export type THousingOverrideOutputBackend = HousingOverrideSchemaOutput;
export type TTrainOverrideOutputBackend = TrainOverrideSchemaOutput;
