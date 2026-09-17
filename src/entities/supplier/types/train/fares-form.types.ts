import { z } from "zod";

import type { TRAIN_FARES_SCHEMA } from "../../schema/train/fares.schema";

export const ENUM_FORM_TRAIN_FARES = {
	FARES_LIST: "fares",
	VARIANT_ID: "variant_id",
	NAME: "name"
} as const;

export type ENUM_FORM_TRAIN_FARES_TYPE =
	(typeof ENUM_FORM_TRAIN_FARES)[keyof typeof ENUM_FORM_TRAIN_FARES];

export type TTrainFaresSchema = z.infer<typeof TRAIN_FARES_SCHEMA>;
export type TTrainFaresList =
	TTrainFaresSchema[typeof ENUM_FORM_TRAIN_FARES.FARES_LIST];
export type TTrainFareRow = TTrainFaresList[number];
