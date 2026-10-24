import { createMockId, createMockIdSequence } from "@/shared/api";

import type {
	TRecurrenceRuleCreateBackend,
	TSeasonalityCommissionCreateBackend
} from "../types";

import {
	type IScheduleMockState,
	SCHEDULE_SEED,
	createScheduleMock
} from "./schedule.mock";

const DAY_MS = 86_400_000;
const DEFAULT_WINDOW_DAYS = 180;

const createScheduleStore = () =>
	new Map(
		SCHEDULE_SEED.map(({ tourId, state }) => [
			tourId,
			structuredClone(state)
		])
	);

let scheduleStore = createScheduleStore();
const ids = createMockIdSequence("b250", 1);

/** Расписание тура; для туров, созданных в моке, заводится на лету */
const getState = (tourId: string): IScheduleMockState => {
	let state = scheduleStore.get(tourId);
	if (!state) {
		state = createScheduleMock(
			createMockId("b110", 1000 + scheduleStore.size),
			scheduleStore.size
		);
		state.recurrence_rules = [];
		state.fixed_dates = [];
		state.excluded_dates = [];
		state.commissions = [];
		scheduleStore.set(tourId, state);
	}
	return state;
};

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Python weekday: 0 — понедельник */
const weekday = (date: Date) => (date.getUTCDay() + 6) % 7;

const inRange = (value: string, from: string | null, until: string | null) =>
	(!from || value >= from) && (!until || value <= until);

const resolveWindow = (from: string | null, to: string | null) => {
	const windowFrom = from ?? toIsoDate(new Date());
	const windowUntil =
		to ??
		toIsoDate(
			new Date(Date.parse(windowFrom) + DEFAULT_WINDOW_DAYS * DAY_MS)
		);
	return { windowFrom, windowUntil };
};

const buildOccurrences = (
	state: IScheduleMockState,
	windowFrom: string,
	windowUntil: string
) => {
	const excluded = new Set(state.excluded_dates.map((date) => date.value));
	const dates = new Set(
		state.fixed_dates
			.map((date) => date.value)
			.filter((value) => inRange(value, windowFrom, windowUntil))
	);

	for (
		let time = Date.parse(windowFrom);
		time <= Date.parse(windowUntil);
		time += DAY_MS
	) {
		const date = new Date(time);
		const value = toIsoDate(date);
		const matchesRule = state.recurrence_rules.some(
			(rule) =>
				rule.day === weekday(date) &&
				inRange(value, rule.valid_from, rule.valid_until)
		);
		if (matchesRule) dates.add(value);
	}

	return [...dates].filter((value) => !excluded.has(value)).sort();
};

export const getFullSchedule = (
	tourId: string,
	from: string | null,
	to: string | null
) => {
	const state = getState(tourId);
	const { windowFrom, windowUntil } = resolveWindow(from, to);
	return {
		schedule: state.schedule,
		fixed_dates: state.fixed_dates,
		excluded_dates: state.excluded_dates,
		recurrence_rules: state.recurrence_rules,
		occurrences: buildOccurrences(state, windowFrom, windowUntil),
		window_from: windowFrom,
		window_until: windowUntil
	};
};

export const getPublicSchedule = (
	tourId: string,
	from: string | null,
	to: string | null
) => {
	const { occurrences, window_from, window_until } = getFullSchedule(
		tourId,
		from,
		to
	);
	return { occurrences, window_from, window_until };
};

export const setScheduleSeasonal = (tourId: string, isSeasonal: boolean) => {
	getState(tourId).schedule.is_seasonal = isSeasonal;
};

export const addFixedDates = (tourId: string, values: string[]) => {
	const state = getState(tourId);
	const created = values.map((value) => ({
		id: ids.next(),
		schedule_id: state.schedule.id,
		value
	}));
	state.fixed_dates.push(...created);
	return created;
};

export const addExcludedDates = (tourId: string, values: string[]) => {
	const state = getState(tourId);
	const created = values.map((value) => ({
		id: ids.next(),
		schedule_id: state.schedule.id,
		value
	}));
	state.excluded_dates.push(...created);
	return created;
};

export const addRecurrenceRules = (
	tourId: string,
	rules: TRecurrenceRuleCreateBackend[]
) => {
	const state = getState(tourId);
	const created = rules.map((rule) => ({
		id: ids.next(),
		schedule_id: state.schedule.id,
		day: rule.day ?? null,
		valid_from: rule.valid_from ?? null,
		valid_until: rule.valid_until ?? null
	}));
	state.recurrence_rules.push(...created);
	return created;
};

type TScheduleListKey =
	| "fixed_dates"
	| "excluded_dates"
	| "recurrence_rules"
	| "commissions";

/** Удаление записей расписания по id; false — ничего не найдено */
export const removeScheduleItems = (
	tourId: string,
	key: TScheduleListKey,
	itemIds: string[]
) => {
	const state = getState(tourId);
	const items: { id: string }[] = state[key];
	const next = items.filter((item) => !itemIds.includes(item.id));
	Object.assign(state, { [key]: next });
	return next.length !== items.length;
};

export const listCommissions = (tourId: string) => getState(tourId).commissions;

export const saveCommission = (
	tourId: string,
	body: TSeasonalityCommissionCreateBackend,
	commissionId?: string
) => {
	const state = getState(tourId);
	if (commissionId) {
		const commission = state.commissions.find(
			(item) => item.id === commissionId
		);
		if (!commission) return undefined;
		Object.assign(commission, body);
		return commission;
	}

	const commission = {
		id: ids.next(),
		schedule_id: state.schedule.id,
		...body
	};
	state.commissions.push(commission);
	return commission;
};

export const resetScheduleStore = () => {
	scheduleStore = createScheduleStore();
	ids.reset(1);
};
