import type { FieldPath, FieldValues } from "react-hook-form";

/**
 * One independently saved slice of a form (e.g. an event's option texts vs
 * its supplier spec). The part builds its own request body from the form
 * values; the autosave sends only parts whose body changed since the last
 * send, so slicing and de-duplication come from the body itself.
 */
export interface IAutosavePart<T extends FieldValues, B = unknown> {
	key: string;
	/** Request body from the current values; `undefined` — nothing to save now. */
	build: (values: T) => B | undefined;
	save: (body: B) => Promise<unknown>;
	/** Fields validated (silently, errors under the fields) before this part is sent. */
	validate?: FieldPath<T>[];
	enabled?: boolean;
}

export type TAutosaveStatus =
	| "idle"
	| "pending"
	| "saving"
	| "saved"
	| "invalid"
	| "error";

export interface IAutosaveServerSync<T extends FieldValues> {
	/** Values read from the server; the form is reset to them. */
	data: T | undefined;
	/** Identity of the edited record: a new key is a new baseline. */
	recordKey: string | undefined;
}

export interface IUseAutosaveOptions<T extends FieldValues> {
	parts: IAutosavePart<T, any>[];
	/** Server values the form is kept in sync with (reset without losing input). */
	server?: IAutosaveServerSync<T>;
	/** Delay after a change of a non-text field. */
	debounceMs?: number;
	/** Fallback delay after typing; a blur of the field saves earlier. */
	textDebounceMs?: number;
	isTextField?: (name: string) => boolean;
	onError?: (error: unknown, partKey: string) => void;
	enabled?: boolean;
}

export interface IUseAutosaveResult {
	status: TAutosaveStatus;
	statusByPart: Record<string, TAutosaveStatus>;
	/** Saves pending changes right away (route change, pool member switch). */
	flush: () => Promise<void>;
	/** Attach to the form container: a blur after typing saves the text now. */
	handleBlur: () => void;
}
