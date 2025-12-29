import type { IChangePasswordBackend } from "../types";
import type { TChangePasswordSchema } from "../types";

export const mapPasswordChangeToBackend = (
	frontend: TChangePasswordSchema
): IChangePasswordBackend => ({
	current_password: frontend.currentPassword,
	new_password: frontend.newPassword
});
