import { z } from "zod";

export const CHANGE_PASSWORD_SCHEMA = z
	.object({
		current_password: z.string().min(6, "form.errors.current_password.min"),
		new_password: z
			.string()
			.min(8, "form.errors.new_password.min")
			.regex(/[A-Z]/, "form.errors.new_password.uppercase")
			.regex(/[a-z]/, "form.errors.new_password.lowercase")
			.regex(/[0-9]/, "form.errors.new_password.number")
			.regex(/[@$!%*?&#]/, "form.errors.new_password.special"),
		confirm_password: z.string()
	})
	.refine((data) => data.new_password === data.confirm_password, {
		path: ["confirm_password"],
		message: "form.errors.confirm_password.mismatch"
	});
