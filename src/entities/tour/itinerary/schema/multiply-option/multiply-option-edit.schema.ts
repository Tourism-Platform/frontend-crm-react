import { z } from "zod";

export const MULTIPLY_OPTION_ITEM_SCHEMA = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	eventType: z.string(),
	details: z.record(z.string(), z.unknown())
	// isOptional: z.boolean()
});

export const MULTIPLY_OPTION_EDIT_SCHEMA = z.object({
	name: z.string(),
	description: z.string(),
	options: z.array(MULTIPLY_OPTION_ITEM_SCHEMA),
	day: z.number().optional(),
	position: z.number().optional()
});
