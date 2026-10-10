import { z } from "zod";

import { type TTourAccommodationEditPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import {
	ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD,
	ENUM_ACCOMMODATION_CHARGE,
	ENUM_ACCOMMODATION_EXPENSE_TYP,
	ENUM_ACCOMMODATION_MARKUP_TYP,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING,
	ENUM_ACCOMMODATION_PRICING_TYPE
} from "../../types";
import { feesArraySchema } from "../common/fee.schema";

const msg = i18nKey<TTourAccommodationEditPageKeys>();

const nullableNumber = z
	.number()
	.nullable()
	.refine((value) => value === null || Number.isFinite(value));

const nonNegativeNullableNumber = nullableNumber.refine(
	(value) => value === null || value >= 0
);

const optionalCurrencySchema = z.enum(ENUM_CURRENCY_OPTIONS).optional();

const markupSchema = z
	.object({
		typ: z.enum(ENUM_ACCOMMODATION_MARKUP_TYP),
		value: z.string()
	})
	// Backend percentage is strictly between 0 and 1 (fe6.4 §12); the form keeps percent.
	.refine(
		(markup) =>
			markup.typ !== ENUM_ACCOMMODATION_MARKUP_TYP.PERCENTAGE ||
			markup.value.trim() === "" ||
			(Number(markup.value) > 0 && Number(markup.value) < 100),
		{
			message: msg("markup_errors.percentage_range"),
			path: ["value"]
		}
	)
	.nullable();

const perRoomPriceRowSchema = z.object({
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES]: feesArraySchema,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.MARKUP]: markupSchema
});

const categoryRowSchema = z.object({
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.ID]: z.string().optional(),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.PAX]: z.number().nullish(),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.NAME]: z.string().min(1, {
		message: msg(
			"form.pricing.form.per_room.fields.category_name.errors.required"
		)
	}),
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST]: nonNegativeNullableNumber,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES]: feesArraySchema,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.CURRENCY]: optionalCurrencySchema,
	[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.MARKUP]: markupSchema
});

const perRoomExpensesSchema = z.object({
	typ: z.literal(ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM),
	[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: z.array(
		perRoomPriceRowSchema
	)
});

const perRoomCategoryExpensesSchema = z.object({
	typ: z.literal(ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY),
	[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: z.array(
		z.object({
			[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES]: z
				.array(categoryRowSchema)
				.min(1, {
					message: msg(
						"form.pricing.form.per_room.fields.categories.errors.min"
					)
				})
		})
	)
});

const validateFlatOrPerPersonPricing = (
	data: {
		total_price?: number | null;
		currency?: ENUM_CURRENCY_OPTIONS_TYPE;
		add_margin_separately: boolean;
	},
	ctx: z.RefinementCtx
) => {
	if (data.total_price == null || data.total_price < 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.min"
			),
			path: [ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (data.total_price != null && data.total_price > 100000) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.total_price.errors.max"
			),
			path: [ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]
		});
	}
	if (!data.currency?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.pricing_details.fields.currency.errors.required"
			),
			path: [ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]
		});
	}
};

const validatePerRoomPricing = (
	data: {
		price_based_on_class: boolean;
		add_margin_separately: boolean;
		expenses?:
			| z.infer<typeof perRoomExpensesSchema>
			| z.infer<typeof perRoomCategoryExpensesSchema>
			| null;
	},
	ctx: z.RefinementCtx
) => {
	const expensesResult = data.price_based_on_class
		? perRoomCategoryExpensesSchema.safeParse(data.expenses)
		: perRoomExpensesSchema.safeParse(data.expenses);

	if (!expensesResult.success) {
		expensesResult.error.issues.forEach((issue) => {
			ctx.addIssue({
				...issue,
				path: [ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES, ...issue.path]
			});
		});
		return;
	}

	// Every room needs a rate and 0 would mean "free" (fe6.4 §6, §14).
	const requireCost = (cost: number | null, path: (string | number)[]) => {
		if (cost != null) return;
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: msg(
				"form.pricing.form.per_room.fields.total_cost.errors.required"
			),
			path: [ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES, ...path]
		});
	};
	const rooms =
		expensesResult.data[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS];

	if (expensesResult.data.typ === ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM) {
		(rooms as z.infer<typeof perRoomExpensesSchema>["rooms"]).forEach(
			(row, index) =>
				requireCost(row[ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST], [
					ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS,
					index,
					ENUM_ACCOMMODATION_PRICE_ROW_FIELD.COST
				])
		);
		return;
	}

	(rooms as z.infer<typeof perRoomCategoryExpensesSchema>["rooms"]).forEach(
		(room, roomIndex) =>
			room[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES].forEach(
				(category, categoryIndex) =>
					requireCost(
						category[ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST],
						[
							ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS,
							roomIndex,
							ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES,
							categoryIndex,
							ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.COST
						]
					)
			)
	);
};

/**
 * Validates only the active pricing tab:
 * - part_of_package → no individual price checks
 * - per_room → expenses only (via superRefine + per-room schemas)
 * - flat_rate / per_person → total_price + currency (+ markup when enabled)
 */
export const ACCOMMODATION_PRICING_SCHEMA = z
	.object({
		[ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING]: z.enum(
			ENUM_ACCOMMODATION_PRICING_INVOICING
		),
		[ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE]: z.enum(
			ENUM_ACCOMMODATION_PRICING_TYPE
		),
		[ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS]: z.boolean(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: z.boolean(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: z
			.union([perRoomExpensesSchema, perRoomCategoryExpensesSchema])
			.nullable()
			.optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.TOTAL_PRICE]:
			nullableNumber.optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.FEES]: feesArraySchema.optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.CURRENCY]: optionalCurrencySchema,
		[ENUM_ACCOMMODATION_PRICING_FIELD.MARKUP]: markupSchema.optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.CHARGE_TYP]: z
			.enum(ENUM_ACCOMMODATION_CHARGE)
			.default(ENUM_ACCOMMODATION_CHARGE.FIXED)
			.optional(),
		[ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]: z.string()
	})
	.superRefine((data, ctx) => {
		if (
			data.invoicing ===
			ENUM_ACCOMMODATION_PRICING_INVOICING.PART_OF_PACKAGE
		) {
			if (!data.package_id?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: msg(
						"form.pricing.form.package.fields.package.errors.required"
					),
					path: [ENUM_ACCOMMODATION_PRICING_FIELD.PACKAGE_ID]
				});
			}
			return;
		}

		if (
			data.invoicing !== ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL
		) {
			return;
		}

		if (data.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM) {
			validatePerRoomPricing(data, ctx);
			return;
		}

		if (
			data.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.FLAT_RATE ||
			data.pricing_type === ENUM_ACCOMMODATION_PRICING_TYPE.PER_PERSON
		) {
			validateFlatOrPerPersonPricing(data, ctx);
		}
	});

export type TAccommodationPricingSchema = z.infer<
	typeof ACCOMMODATION_PRICING_SCHEMA
>;
