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
};

type TValidateTranslate = (key: string, options?: object) => string;

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
	{ keyPrefix }: TValidateFormWithSectionToastOptions
): Promise<boolean> {
	const t = tInput as TValidateTranslate;
	const isValid = await form.trigger();
	if (isValid) return true;

	const errors = form.formState.errors as Record<string, unknown>;
	const errorSections = FORM_SECTION_KEYS.filter(
		(key) => errors[key] != null
	);

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
