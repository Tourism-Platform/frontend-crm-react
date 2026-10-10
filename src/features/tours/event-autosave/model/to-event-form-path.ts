import type { FieldPath, FieldValues } from "react-hook-form";

/**
 * Top-level 422 issues of an event body (`["body", "<typ>", "name"]`) onto
 * form fields; nested spec paths are left to the error toast (fe6.4 §13).
 */
export const toEventFormPath = <T extends FieldValues>(
	loc: (string | number)[]
): FieldPath<T> | undefined => {
	const [, , field, ...rest] = loc;
	if (rest.length) return undefined;
	if (field === "name") return "name" as FieldPath<T>;
	if (field === "description") return "general.description" as FieldPath<T>;
	return undefined;
};
