import { authHandlers } from "@/entities/auth/api/auth.mock";
import { commissionHandlers } from "@/entities/commission";
import { staffHandlers } from "@/entities/staff";
import {
	accountHandlers,
	businessDocumentsHandlers,
	businessHandlers
} from "@/entities/user/handlers";

export const handlers = [
	...authHandlers,
	...accountHandlers,
	...businessHandlers,
	...businessDocumentsHandlers,
	...staffHandlers,
	...commissionHandlers
];
