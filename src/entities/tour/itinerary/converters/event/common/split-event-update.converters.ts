import type {
	TEventDetailsBackend,
	TTourEventMemberUpdateBackend,
	TTourEventOptionUpdateBackend,
	TTourEventUpdateBackend
} from "../../../types";

import { getEventPool } from "./event-pool.helpers";

export interface ISplitEventUpdate {
	/** `PATCH O`: texts, package and plan. Always sent. */
	option: TTourEventOptionUpdateBackend;
	/** `PATCH M`: the edited inline pool member, when there is one. */
	member?: { supplyId: string; body: TTourEventMemberUpdateBackend };
}

type TWritePoolMember = {
	id?: string | null;
	supply: { source: string; spec?: unknown };
};

type TReadSupply = { source: string; supplier_id?: string | null };

/**
 * Splits the full write body (plan + pool) built by the form converters into
 * `PATCH O` (texts, package, plan) and `PATCH M` (the selected inline pool
 * member) — the option route rejects `details.pool` (contract fe6.4 §1–4).
 *
 * `memberSource` lets the pool member come from another build of the same
 * form (individual pricing while the event is in a package — fe6.4 §7: a
 * package is `PATCH O` only and leaves the supplier spec as it is).
 *
 * The member is picked by the same rule as `replaceSelectedPoolMemberSupply`:
 * `supplyId` when given, otherwise the first one. A product member, a member
 * without an id or no pool at all yields no `PATCH M` — the pool stays as is.
 */
export const splitEventUpdate = (
	body: TTourEventUpdateBackend,
	supplyId: string | undefined,
	currentDetails?: TEventDetailsBackend,
	memberSource: TTourEventUpdateBackend = body
): ISplitEventUpdate => {
	const { details, ...top } = body;
	const plan = details && "plan" in details ? details.plan : undefined;

	const option = {
		...top,
		details: plan !== undefined ? { plan } : {}
	} as TTourEventOptionUpdateBackend;

	// Write pools may be `null`; `getEventPool` treats a non-array as empty.
	const pool = getEventPool(
		memberSource.details as { pool?: readonly unknown[] } | undefined
	) as TWritePoolMember[];
	const selected = supplyId
		? pool.find((member) => member.id === supplyId)
		: pool[0];

	if (!selected?.id || selected.supply.source !== "inline") {
		return { option };
	}

	// The member route replaces the supplier too: echo it, or it is erased.
	const currentSupply = (
		getEventPool(currentDetails) as { id?: string; supply?: TReadSupply }[]
	).find((member) => member.id === selected.id)?.supply;
	const supplierId =
		currentSupply?.source === "inline"
			? (currentSupply.supplier_id ?? null)
			: null;

	return {
		option,
		member: {
			supplyId: selected.id,
			body: {
				typ: body.typ,
				supplier_id: supplierId,
				spec: selected.supply.spec
			} as TTourEventMemberUpdateBackend
		}
	};
};
