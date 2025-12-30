import { authHandlers } from "@/entities/auth/api/auth.mock";
import {
	accountHandlers,
	businessDocumentsHandlers,
	businessHandlers
} from "@/entities/user/handlers";

export const handlers = [
	...authHandlers,
	...accountHandlers,
	...businessHandlers,
	...businessDocumentsHandlers
];
