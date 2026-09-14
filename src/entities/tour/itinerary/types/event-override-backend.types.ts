import type {
	HotelOverrideInput,
	HotelOverrideOutput,
	RouteOverrideInput,
	RouteOverrideOutput,
	TOUR_EVENTS_PATHS
} from "@/shared/api";

export type TEventOverrideInputBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.setOptionOverride
>["_types"]["body"];

export type THousingOverrideInputBackend = HotelOverrideInput;
export type TTrainOverrideInputBackend = RouteOverrideInput;

export type THousingOverrideOutputBackend = HotelOverrideOutput;
export type TTrainOverrideOutputBackend = RouteOverrideOutput;
