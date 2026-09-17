import type { TEventDetailsBackend } from "../../../types";
import type { IEventPoolMemberSummary } from "../../../types/event-pool.types";

/**
 * Operator READ pool helpers (contract 6 / 6.1).
 *
 * READ member: `{ id, is_main, supply, spec }`.
 * Never send `is_main` back on WRITE.
 */

export type TEventPoolMemberBackend = TEventDetailsBackend["pool"][number];

export type TProductPoolMemberBackend = TEventPoolMemberBackend & {
	supply: Extract<TEventPoolMemberBackend["supply"], { source: "product" }>;
};

type TPoolHolder = { pool?: readonly unknown[] } | null | undefined;

type TPoolMemberOf<T> = T extends { pool?: readonly (infer M)[] | undefined }
	? M
	: never;

export const getEventPool = <T extends TPoolHolder>(
	details: T
): TPoolMemberOf<NonNullable<T>>[] =>
	(details && "pool" in details && Array.isArray(details.pool)
		? details.pool
		: []) as TPoolMemberOf<NonNullable<T>>[];

export const getPoolMember = <T extends TPoolHolder>(
	details: T,
	supplyId?: string | null
): TPoolMemberOf<NonNullable<T>> | undefined => {
	const pool = getEventPool(details);
	if (supplyId) {
		const found = pool.find(
			(member) =>
				typeof member === "object" &&
				member !== null &&
				"id" in member &&
				member.id === supplyId
		);
		if (found) return found;
	}
	return getMainPoolMember(details);
};

export const getMainPoolMember = <T extends TPoolHolder>(
	details: T
): TPoolMemberOf<NonNullable<T>> | undefined => {
	const pool = getEventPool(details);
	return (
		pool.find(
			(member) =>
				typeof member === "object" &&
				member !== null &&
				"is_main" in member &&
				member.is_main
		) ?? pool[0]
	);
};

export const isProductPoolMember = (
	member: { supply?: { source?: string } } | undefined
): member is TProductPoolMemberBackend => member?.supply?.source === "product";

export const canRemovePoolMember = (details: TPoolHolder): boolean =>
	getEventPool(details).length > 1;

export const getPoolMemberLabel = (
	member: TEventPoolMemberBackend | undefined
): string => {
	if (!member) return "";
	if (isProductPoolMember(member)) {
		return member.supply.supplier.name || member.supply.product_id;
	}

	const spec = member.spec;
	if (spec && typeof spec === "object" && "name" in spec) {
		const name = spec.name;
		if (typeof name === "string" && name.trim()) {
			return name;
		}
	}

	if (member.supply.source === "inline" && member.supply.supplier_id) {
		return member.supply.supplier_id;
	}

	return member.id;
};

export const mapEventPoolToSummary = (
	details: TPoolHolder
): IEventPoolMemberSummary[] =>
	getEventPool(details).map((member) => {
		const record = member as TEventPoolMemberBackend;
		return {
			id: record.id,
			supplierLabel: getPoolMemberLabel(record),
			isMain: Boolean(record.is_main)
		};
	});
