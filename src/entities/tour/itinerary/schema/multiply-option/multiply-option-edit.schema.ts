import { z } from "zod";

import { EventTypes } from "@/shared/api";

import type { TEventDetailsBackend } from "../../types/event-backend.types";
import { ENUM_EVENT } from "../../types/event-enum.types";

/**
 * One alternative row on the multiply-option form.
 * `details` is the typed READ details (`{ plan, supply, spec }`) — the form
 * never edits them field-by-field, so a shallow custom check is enough; the
 * READ → WRITE converter re-validates the shape at the API boundary.
 */
export const MULTIPLY_OPTION_ITEM_SCHEMA = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	eventType: z.nativeEnum(ENUM_EVENT),
	backendTyp: z.nativeEnum(EventTypes),
	details: z.custom<TEventDetailsBackend>(
		(value) => typeof value === "object" && value !== null
	),
	timeSubtitle: z.string().optional(),
	isOptional: z.boolean().optional()
});

export const MULTIPLY_OPTION_EDIT_SCHEMA = z.object({
	name: z.string(),
	description: z.string(),
	options: z.array(MULTIPLY_OPTION_ITEM_SCHEMA),
	day: z.number().min(1).optional(),
	position: z.number().optional()
});
