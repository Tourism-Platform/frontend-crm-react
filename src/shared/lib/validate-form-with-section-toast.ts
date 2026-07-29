import { toast } from "sonner";

const FORM_SECTION_KEYS = [
	"general",
	"pricing",
	"rooms",
	"cars",
	"guides",
	"items",
	"name"
] as const;

type TValidateFormWithSectionToastOptions = {
	/** e.g. "form.toasts.validation.error" or "toasts.validation.error" */
	keyPrefix: string;
	/** Limit RHF trigger to a section / fields (e.g. "pricing") */
	fields?: string | string[];
};

type TValidateTranslate = (key: string, options?: object) => string;

type TFlattenFormError = {
	path: string;
	message?: string;
};

function flattenFormErrors(
	value: unknown,
	path: string[] = [],
	acc: TFlattenFormError[] = []
): TFlattenFormError[] {
	if (!value || typeof value !== "object") return acc;

	const maybeFieldError = value as { message?: unknown };
	if (typeof maybeFieldError.message === "string") {
		acc.push({
			path: path.join("."),
			message: maybeFieldError.message
		});
	}

	for (const [key, nestedValue] of Object.entries(
		value as Record<string, unknown>
	)) {
		if (key === "message" || key === "type" || key === "ref") continue;
		flattenFormErrors(nestedValue, [...path, key], acc);
	}

	return acc;
}

/**
 * Accepts RHF form + i18next `t` via loose params so tsc does not crash on
 * UseFormReturn / TFunction overload resolution at call sites.
 */
export async function validateFormWithSectionToast(
	form: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		trigger: (...args: any[]) => Promise<boolean>;
		formState: { errors: object };
	},
	tInput: unknown,
	{ keyPrefix, fields }: TValidateFormWithSectionToastOptions
): Promise<boolean> {
	const t = tInput as TValidateTranslate;
	const isValid = await form.trigger(fields);
	if (isValid) return true;

	const errors = form.formState.errors as Record<string, unknown>;
	const errorSections = FORM_SECTION_KEYS.filter(
		(key) => errors[key] != null
	);
	const flatErrors = flattenFormErrors(errors);

	console.error("[form-validation] submit blocked", {
		fields,
		keyPrefix,
		errorSections,
		flatErrors,
		errors
	});

	if (errorSections.length === 0) {
		toast.error(t(`${keyPrefix}.fallback`));
		return false;
	}

	if (errorSections.length === 1) {
		const section = errorSections[0];
		toast.error(
			t(`${keyPrefix}.${section}`, {
				defaultValue: t(`${keyPrefix}.fallback`)
			})
		);
		return false;
	}

	const sectionLabels = errorSections
		.map((section) =>
			t(`${keyPrefix}.section_names.${section}`, {
				defaultValue: section
			})
		)
		.join(", ");

	toast.error(
		t(`${keyPrefix}.multiple`, {
			sections: sectionLabels,
			defaultValue: t(`${keyPrefix}.fallback`)
		})
	);

	return false;
}
