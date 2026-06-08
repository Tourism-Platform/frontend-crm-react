import { format } from "date-fns";

import { parseLocalDateString } from "@/shared/lib";

import type {
	IExcludedDate,
	IExcludedDateCreate,
	IFixedDate,
	IFixedDateCreate,
	IFullSchedule,
	IRecurrenceRule,
	IRecurrenceRuleCreate,
	ISchedule,
	TExcludedDateBackend,
	TExcludedDateCreateBackend,
	TFixedDateBackend,
	TFixedDateCreateBackend,
	TFullScheduleBackend,
	TRecurrenceRuleBackend,
	TRecurrenceRuleCreateBackend,
	TTourScheduleBackend,
	TTourScheduleUpdateBackend
} from "../types";

export const mapScheduleToBackend = (
	frontend: ISchedule
): TTourScheduleUpdateBackend => ({
	is_seasonal: frontend.isSeasonal
});

export const mapScheduleToFrontend = (
	backend: TTourScheduleBackend
): ISchedule => ({
	isSeasonal: backend.is_seasonal ?? false
});

export const mapFixedDateToBackend = (
	frontend: IFixedDateCreate
): TFixedDateCreateBackend => ({
	value: format(frontend.value, "yyyy-MM-dd")
});

export const mapFixedDateToFrontend = (
	backend: TFixedDateBackend
): IFixedDate => ({
	id: backend.id,
	value: parseLocalDateString(backend.value)
});

export const mapExcludedDateToBackend = (
	frontend: IExcludedDateCreate
): TExcludedDateCreateBackend => ({
	value: format(frontend.value, "yyyy-MM-dd")
});

export const mapExcludedDateToFrontend = (
	backend: TExcludedDateBackend
): IExcludedDate => ({
	id: backend.id,
	value: parseLocalDateString(backend.value)
});

export const mapRecurrenceRuleToBackend = (
	frontend: IRecurrenceRuleCreate
): TRecurrenceRuleCreateBackend => ({
	day: frontend.day ?? null,
	valid_from: frontend.validFrom
		? format(frontend.validFrom, "yyyy-MM-dd")
		: null,
	valid_until: frontend.validUntil
		? format(frontend.validUntil, "yyyy-MM-dd")
		: null
});

export const mapRecurrenceRuleToFrontend = (
	backend: TRecurrenceRuleBackend
): IRecurrenceRule => ({
	id: backend.id,
	day: backend.day,
	validFrom: backend.valid_from
		? parseLocalDateString(backend.valid_from)
		: null,
	validUntil: backend.valid_until
		? parseLocalDateString(backend.valid_until)
		: null
});

export const mapFullScheduleToFrontend = (
	backend: TFullScheduleBackend
): IFullSchedule => ({
	schedule: mapScheduleToFrontend(backend.schedule),
	fixedDates: backend.fixed_dates.map(mapFixedDateToFrontend),
	excludedDates: backend.excluded_dates.map(mapExcludedDateToFrontend),
	recurrenceRules: backend.recurrence_rules.map(mapRecurrenceRuleToFrontend),
	occurrences: (backend.occurrences ?? []).map((d) =>
		parseLocalDateString(d)
	),
	windowFrom: backend.window_from
		? parseLocalDateString(backend.window_from)
		: null,
	windowUntil: backend.window_until
		? parseLocalDateString(backend.window_until)
		: null
});
