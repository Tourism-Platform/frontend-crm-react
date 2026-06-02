import type { z } from "zod";

import type { BUS_SEGMENT_SCHEMA } from "../../schema/flight/bus.schema";
import type { FLIGHT_EDIT_SCHEMA } from "../../schema/flight/flight-edit.schema";
import type { FLY_SEGMENT_SCHEMA } from "../../schema/flight/fly.schema";
import type { GENERAL_INFO_SCHEMA } from "../../schema/flight/general-info.schema";
import type { TRAIN_SEGMENT_SCHEMA } from "../../schema/flight/train.schema";

export type TFlightEditSchema = z.infer<typeof FLIGHT_EDIT_SCHEMA>;
export type TFlyRouteSegment = z.infer<typeof FLY_SEGMENT_SCHEMA>;
export type TTrainRouteSegment = z.infer<typeof TRAIN_SEGMENT_SCHEMA>;
export type TBusRouteSegment = z.infer<typeof BUS_SEGMENT_SCHEMA>;
export type TRouteSegment =
	| TFlyRouteSegment
	| TTrainRouteSegment
	| TBusRouteSegment;
export type TFlightGeneralInfo = z.infer<typeof GENERAL_INFO_SCHEMA>;
