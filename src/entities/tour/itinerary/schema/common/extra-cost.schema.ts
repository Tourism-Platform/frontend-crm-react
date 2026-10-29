import { z } from "zod";

import { type TTourCommonEventsKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_EXTRA_COST_FIELD,
	ENUM_EXTRA_COST_MODE,
	type TExtraCostInputBackend
} from "../../types";

const msg = i18nKey<TTourCommonEventsKeys>();

const NAME_MAX_LENGTH = 255;

export const extraCostRowSchema = z
	.object({
		[ENUM_EXTRA_COST_FIELD.NAME]: z.string().nullable(),
		[ENUM_EXTRA_COST_FIELD.MODE]: z.enum(ENUM_EXTRA_COST_MODE),
		[ENUM_EXTRA_COST_FIELD.COST]: z.number().nullable(),
		[ENUM_EXTRA_COST_FIELD.CURRENCY]: z
			.enum(ENUM_CURRENCY_OPTIONS)
			.nullable(),
		[ENUM_EXTRA_COST_FIELD.RAW]: z
			.custom<TExtraCostInputBackend>()
			.nullable()
	})
	// Backend `ExtraCost`: a named line with a non-negative cost.
	.superRefine((data, ctx) => {
		if (data[ENUM_EXTRA_COST_FIELD.RAW]) return;

		const name = data[ENUM_EXTRA_COST_FIELD.NAME]?.trim() ?? "";
		if (!name || name.length > NAME_MAX_LENGTH) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg("extra_costs.fields.name.errors.required"),
				path: [ENUM_EXTRA_COST_FIELD.NAME]
			});
		}

		const cost = data[ENUM_EXTRA_COST_FIELD.COST];
		if (cost === null || !Number.isFinite(cost) || cost < 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg("extra_costs.fields.cost.errors.required"),
				path: [ENUM_EXTRA_COST_FIELD.COST]
			});
		}

		if (data[ENUM_EXTRA_COST_FIELD.CURRENCY] === null) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg("extra_costs.fields.currency.errors.required"),
				path: [ENUM_EXTRA_COST_FIELD.CURRENCY]
			});
		}
	});

export const extraCostsArraySchema = z.array(extraCostRowSchema);
