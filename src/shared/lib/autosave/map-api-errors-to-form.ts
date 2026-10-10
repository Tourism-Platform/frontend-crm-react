import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface IValidationIssue {
	loc?: (string | number)[];
	msg?: string;
}

const getIssues = (error: unknown): IValidationIssue[] => {
	const detail = (error as { data?: { detail?: unknown } } | undefined)?.data
		?.detail;
	return Array.isArray(detail) ? (detail as IValidationIssue[]) : [];
};

/**
 * Puts 422 validation issues on form fields. `loc` is the API path
 * (`["body", "<typ>", "name"]`); `toFormPath` maps it to a form field or
 * returns `undefined` for paths the form does not show. Returns how many
 * issues were placed, so the caller can still toast the rest.
 */
export const mapApiErrorsToForm = <T extends FieldValues>(
	error: unknown,
	form: UseFormReturn<T>,
	toFormPath: (loc: (string | number)[]) => FieldPath<T> | undefined
): number => {
	let placed = 0;
	for (const issue of getIssues(error)) {
		const field = issue.loc ? toFormPath(issue.loc) : undefined;
		if (!field) continue;
		form.setError(field, { type: "server", message: issue.msg });
		placed += 1;
	}
	return placed;
};
