import type { TChangePasswordBackend } from "../types";
import type { TChangePasswordSchema } from "../types";

export const mapPasswordChangeToBackend = (
	frontend: TChangePasswordSchema
): TChangePasswordBackend => ({
	current_password: frontend.currentPassword,
	new_password: frontend.newPassword
});
