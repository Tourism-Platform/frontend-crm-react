import {
	ENUM_AVAILABILITY_STATUS,
	type ENUM_AVAILABILITY_STATUS_TYPE
} from "../types/availability-status.types";
import type { IBookingEventAvailability } from "../types/booking-availability.types";

export type TAvailabilityEventGroup = {
	eventId: string;
	rows: IBookingEventAvailability[];
};

export type TAvailabilityReadiness = {
	ready: boolean;
	incompleteEventIds: string[];
	/** Backend contract: multi-option group must have exactly one SELECTED */
	multiOptionViolations: Array<{
		eventId: string;
		selectedCount: number;
		optionIndexes: number[];
	}>;
};

export const groupAvailabilityByEventId = (
	rows: IBookingEventAvailability[]
): TAvailabilityEventGroup[] => {
	const order: string[] = [];
	const map = new Map<string, IBookingEventAvailability[]>();

	for (const row of rows) {
		if (!map.has(row.eventId)) {
			order.push(row.eventId);
			map.set(row.eventId, []);
		}
		map.get(row.eventId)!.push(row);
	}

	return order.map((eventId) => ({
		eventId,
		rows: map.get(eventId)!.sort((a, b) => a.optionIndex - b.optionIndex)
	}));
};

const countSelected = (rows: IBookingEventAvailability[]): number =>
	rows.filter((row) => row.status === ENUM_AVAILABILITY_STATUS.SELECTED)
		.length;

/** Group is ready when backend has exactly one SELECTED option (singular or multi). */
export const isEventGroupReady = (rows: IBookingEventAvailability[]): boolean =>
	countSelected(rows) === 1;

export const getAvailabilityReadiness = (
	rows: IBookingEventAvailability[]
): TAvailabilityReadiness => {
	const groups = groupAvailabilityByEventId(rows);
	const incompleteEventIds: string[] = [];
	const multiOptionViolations: TAvailabilityReadiness["multiOptionViolations"] =
		[];

	for (const group of groups) {
		const selected = group.rows.filter(
			(row) => row.status === ENUM_AVAILABILITY_STATUS.SELECTED
		);
		const selectedCount = selected.length;

		if (group.rows.length > 1 && selectedCount > 1) {
			multiOptionViolations.push({
				eventId: group.eventId,
				selectedCount,
				optionIndexes: selected.map((row) => row.optionIndex)
			});
		}

		if (selectedCount !== 1) {
			incompleteEventIds.push(group.eventId);
		}
	}

	return {
		ready:
			incompleteEventIds.length === 0 &&
			multiOptionViolations.length === 0,
		incompleteEventIds,
		multiOptionViolations
	};
};

export type TAvailabilitySelectionProgress = {
	selected: number;
	total: number;
	complete: boolean;
};

/** Counts event groups with exactly one SELECTED (multi-option = one slot). */
export const getAvailabilitySelectionProgress = (
	rows: IBookingEventAvailability[]
): TAvailabilitySelectionProgress => {
	const groups = groupAvailabilityByEventId(rows);
	const selected = groups.filter((group) =>
		isEventGroupReady(group.rows)
	).length;
	const total = groups.length;

	return {
		selected,
		total,
		complete: total > 0 && selected === total
	};
};

/** Apply enabled only when backend status still has a next apply step. */
export const isAvailabilityApplyEnabled = (
	status?: ENUM_AVAILABILITY_STATUS_TYPE
): boolean => {
	switch (status) {
		case undefined:
		case ENUM_AVAILABILITY_STATUS.PENDING:
		case ENUM_AVAILABILITY_STATUS.AVAILABLE:
		case ENUM_AVAILABILITY_STATUS.UNAVAILABLE:
		case ENUM_AVAILABILITY_STATUS.DESELECTED:
			return true;
		case ENUM_AVAILABILITY_STATUS.SELECTED:
			return false;
		default:
			return false;
	}
};
