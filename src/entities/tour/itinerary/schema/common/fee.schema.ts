import { z } from "zod";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FEE_FIELD } from "../../types/fee.types";

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const nonNegativeNullableNumber = nullableNumber.refine(
	(value) => value === null || value >= 0
);

export const feeRowSchema = z
	.object({
		[ENUM_FEE_FIELD.NAME]: z.string().nullable(),
		[ENUM_FEE_FIELD.COST]: nonNegativeNullableNumber,
		[ENUM_FEE_FIELD.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS).nullable(),
		[ENUM_FEE_FIELD.DESCRIPTION]: z.string().nullable()
	})
	.superRefine((data, ctx) => {
		if (
			data[ENUM_FEE_FIELD.COST] != null &&
			data[ENUM_FEE_FIELD.CURRENCY] == null
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "currency required when cost is set",
				path: [ENUM_FEE_FIELD.CURRENCY]
			});
		}
	});

export const feesArraySchema = z.array(feeRowSchema);
