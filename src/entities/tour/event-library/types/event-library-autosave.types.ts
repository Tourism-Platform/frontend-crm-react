import type { FieldValues } from "react-hook-form";

import type { IAutosavePart } from "@/shared/lib";

import type { TUpdateEventLibraryBackend } from "./event-library-backend.types";

/**
 * Library entry autosave part: `PATCH /tour/event/library/{id}` writes the
 * whole entry (fe6.4 §14). The body is built inside the entity, so
 * `useAutosave` compares exactly what is sent.
 */
export type TEventLibraryAutosavePart<T extends FieldValues> = IAutosavePart<
	T,
	TUpdateEventLibraryBackend
>;
