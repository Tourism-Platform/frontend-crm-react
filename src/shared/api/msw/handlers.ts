import { authHandlers } from "@/entities/auth/api/auth.mock";
import { accountHandlers } from "@/entities/user/handlers/account.handlers";

export const handlers = [...authHandlers, ...accountHandlers];
