import { z } from "zod";

import { type TTourEventGuideEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_GUIDE_CHARGE,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PRICE_BOUND_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	GUIDE_MAX_PRICE_COLUMNS
} from "../../types";
import { extraCostsArraySchema } from "../common/extra-cost.schema";
import { feesArraySchema } from "../common/fee.schema";

const msg = i18nKey<TTourEventGuideEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const nonNegativeNullableNumber = nullableNumber.refine(
	(value) => value === null || value >= 0
);

const markupSchema = z
	.object({
		typ: z.enum(ENUM_GUIDE_MARKUP_TYP),
		value: z.string()
	})
	// Backend percentage is strictly between 0 and 1 (fe6.4 §12); the form keeps percent.
	.refine(
		(markup) =>
			markup.typ !== ENUM_GUIDE_MARKUP_TYP.PERCENTAGE ||
			markup.value.trim() === "" ||
			(Number(markup.value) > 0 && Number(markup.value) < 100),
		{
			message: msg("markup_errors.percentage_range"),
			path: ["value"]
		}
	)
	// Backend fixed markup is `val ≥ 0` (fe6.6 §10).
	.refine(
		(markup) =>
			markup.typ !== ENUM_GUIDE_MARKUP_TYP.FIXED ||
			markup.value.trim() === "" ||
			(Number.isFinite(Number(markup.value)) &&
				Number(markup.value) >= 0),
		{
			message: msg("markup_errors.fixed_min"),
			path: ["value"]
		}
	)
	.nullable();

const boundSchema = z.object({
	[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX]: nullableNumber
});

const priceRowSchema = z.object({
	// `GUIDE_ANY_LANGUAGE` is the `lang: null` fallback; empty is not chosen yet.
	[ENUM_GUIDE_PRICE_ROW_FIELD.LANG]: z.string(),
	[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS]: z.array(nonNegativeNullableNumber)
});

const pricingObjectSchema = z.object({
	[ENUM_GUIDE_PRICING_FIELD.INVOICING]: z.enum(ENUM_GUIDE_PRICING_INVOICING),
	[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
	[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP]: z.enum(ENUM_GUIDE_CHARGE),
	[ENUM_GUIDE_PRICING_FIELD.CURRENCY]: z
		.enum(ENUM_CURRENCY_OPTIONS)
		.optional(),
	[ENUM_GUIDE_PRICING_FIELD.BOUNDS]: z.array(boundSchema),
	[ENUM_GUIDE_PRICING_FIELD.ROWS]: z.array(priceRowSchema),
	[ENUM_GUIDE_PRICING_FIELD.FEES]: feesArraySchema,
	[ENUM_GUIDE_PRICING_FIELD.MARKUP]: markupSchema,
	[ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS]: extraCostsArraySchema,
	[ENUM_GUIDE_PRICING_FIELD.IS_LEGACY_SHAPE]: z.boolean(),
	[ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]: z.string()
});

type TPricing = z.infer<typeof pricingObjectSchema>;

const isPerDuration = (data: TPricing) =>
	data[ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP] ===
	ENUM_GUIDE_CHARGE.PER_DURATION;

// Backend `PerGroupExpense`: bounds are whole group sizes, strictly growing.
const refineBounds = (data: TPricing, ctx: z.RefinementCtx) => {
	const bounds = data[ENUM_GUIDE_PRICING_FIELD.BOUNDS];

	if (bounds.length >= GUIDE_MAX_PRICE_COLUMNS) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.matrix.fields.up_to_pax.errors.max"
			),
			path: [ENUM_GUIDE_PRICING_FIELD.BOUNDS]
		});
	}

	bounds.forEach((bound, index) => {
		const upToPax = bound[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX];
		const prev =
			bounds[index - 1]?.[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX];
		const path = [
			ENUM_GUIDE_PRICING_FIELD.BOUNDS,
			index,
			ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX
		];

		if (upToPax === null || upToPax < 1 || !Number.isInteger(upToPax)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.matrix.fields.up_to_pax.errors.required"
				),
				path
			});
		} else if (prev != null && upToPax <= prev) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.matrix.fields.up_to_pax.errors.order"
				),
				path
			});
		}
	});
};

// A row is either unpriced (language without a price yet) or priced in
// every column; per day a price never drops as the group grows.
const refineRows = (data: TPricing, ctx: z.RefinementCtx) => {
	const columns = isPerDuration(data)
		? data[ENUM_GUIDE_PRICING_FIELD.BOUNDS].length + 1
		: 1;
	const seenLangs = new Set<string>();

	data[ENUM_GUIDE_PRICING_FIELD.ROWS].forEach((row, rowIndex) => {
		const rowPath = [ENUM_GUIDE_PRICING_FIELD.ROWS, rowIndex];
		const lang = row[ENUM_GUIDE_PRICE_ROW_FIELD.LANG];

		if (!lang) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.matrix.fields.lang.errors.required"
				),
				path: [...rowPath, ENUM_GUIDE_PRICE_ROW_FIELD.LANG]
			});
		} else if (seenLangs.has(lang)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.matrix.fields.lang.errors.duplicate"
				),
				path: [...rowPath, ENUM_GUIDE_PRICE_ROW_FIELD.LANG]
			});
		}
		seenLangs.add(lang);

		const costs = Array.from(
			{ length: columns },
			(_, index) => row[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS][index] ?? null
		);
		if (costs.every((cost) => cost === null)) return;

		costs.forEach((cost, index) => {
			const prev = costs[index - 1];
			const path = [...rowPath, ENUM_GUIDE_PRICE_ROW_FIELD.COSTS, index];

			if (cost === null) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg(
						"form.pricing.form.matrix.fields.cost.errors.required"
					),
					path
				});
			} else if (prev != null && cost < prev) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg(
						"form.pricing.form.matrix.fields.cost.errors.order"
					),
					path
				});
			}
		});
	});
};

export const GUIDE_PRICING_SCHEMA = pricingObjectSchema.superRefine(
	(data, ctx) => {
		if (data.invoicing === ENUM_GUIDE_PRICING_INVOICING.PART_OF_PACKAGE) {
			if (!data.package_id?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"form.pricing.form.package.fields.package.errors.required",
					path: [ENUM_GUIDE_PRICING_FIELD.PACKAGE_ID]
				});
			}
			return;
		}

		if (isPerDuration(data)) {
			refineBounds(data, ctx);
		}
		refineRows(data, ctx);

		const hasPrice = data[ENUM_GUIDE_PRICING_FIELD.ROWS].some((row) =>
			row[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS].some((cost) => cost !== null)
		);
		if (hasPrice && !data[ENUM_GUIDE_PRICING_FIELD.CURRENCY]) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: msg(
					"form.pricing.form.matrix.fields.currency.errors.required"
				),
				path: [ENUM_GUIDE_PRICING_FIELD.CURRENCY]
			});
		}
	}
);
