import { dateToDayTimestamp } from "./calendar-range";

const PENDING_ID_PREFIX = "pending-";

export const makePendingId = (ts: number): string =>
	`${PENDING_ID_PREFIX}${ts}`;

export const isPendingId = (id: string): boolean =>
	id.startsWith(PENDING_ID_PREFIX);

export const parsePendingTimestamp = (id: string): number =>
	Number(id.slice(PENDING_ID_PREFIX.length));

export const mergeDatesWithPending = <T extends { id: string; value: Date }>(
	serverDates: T[],
	pendingAdd: Map<number, Date>,
	pendingRemoveIds: Set<string>
): T[] => {
	const fromServer = serverDates.filter((d) => !pendingRemoveIds.has(d.id));
	const serverTimestamps = new Set(
		fromServer.map((d) => dateToDayTimestamp(d.value))
	);

	const pending = [...pendingAdd.entries()]
		.filter(([ts]) => !serverTimestamps.has(ts))
		.map(
			([ts, value]) =>
				({
					id: makePendingId(ts),
					value
				}) as T
		);

	return [...fromServer, ...pending];
};

export const prunePendingState = <T extends { id: string; value: Date }>(
	serverDates: T[],
	pendingAdd: Map<number, Date>,
	pendingRemoveIds: Set<string>
): {
	pendingAdd: Map<number, Date>;
	pendingRemoveIds: Set<string>;
} => {
	let nextAdd = pendingAdd;
	let nextRemove = pendingRemoveIds;

	if (pendingAdd.size > 0) {
		const map = new Map(pendingAdd);
		for (const ts of pendingAdd.keys()) {
			if (serverDates.some((d) => dateToDayTimestamp(d.value) === ts)) {
				map.delete(ts);
			}
		}
		if (map.size !== pendingAdd.size) {
			nextAdd = map;
		}
	}

	if (pendingRemoveIds.size > 0) {
		const set = new Set(pendingRemoveIds);
		for (const id of pendingRemoveIds) {
			if (!serverDates.some((d) => d.id === id)) {
				set.delete(id);
			}
		}
		if (set.size !== pendingRemoveIds.size) {
			nextRemove = set;
		}
	}

	return { pendingAdd: nextAdd, pendingRemoveIds: nextRemove };
};
