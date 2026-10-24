import type { IEventPoolMemberSummary } from "../types";

/** The member addressed by `supplyId`, otherwise the main one (or the first). */
export const selectPoolMember = <T extends IEventPoolMemberSummary>(
	pool: T[],
	supplyId?: string | null
): T | undefined =>
	(supplyId ? pool.find((member) => member.id === supplyId) : undefined) ??
	pool.find((member) => member.isMain) ??
	pool[0];
