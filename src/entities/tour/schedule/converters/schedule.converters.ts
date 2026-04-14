import { formatISO } from "date-fns";

import type {
	IFixedDate,
	IFixedDateCreate,
	IFullSchedule,
	IRecurrenceRule,
	IRecurrenceRuleCreate,
	ISchedule,
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
	value: formatISO(frontend.value)
});

export const mapFixedDateToFrontend = (
	backend: TFixedDateBackend
): IFixedDate => ({
	id: backend.id,
	value: new Date(backend.value)
});

export const mapRecurrenceRuleToBackend = (
	frontend: IRecurrenceRuleCreate
): TRecurrenceRuleCreateBackend => ({
	day: frontend.day ?? null,
	valid_from: frontend.validFrom ? formatISO(frontend.validFrom) : null,
	valid_until: frontend.validUntil ? formatISO(frontend.validUntil) : null
});

export const mapRecurrenceRuleToFrontend = (
	backend: TRecurrenceRuleBackend
): IRecurrenceRule => ({
	id: backend.id,
	day: backend.day,
	validFrom: backend.valid_from ? new Date(backend.valid_from) : null,
	validUntil: backend.valid_until ? new Date(backend.valid_until) : null
});

export const mapFullScheduleToFrontend = (
	backend: TFullScheduleBackend
): IFullSchedule => ({
	schedule: mapScheduleToFrontend(backend.schedule),
	fixedDates: backend.fixed_dates.map(mapFixedDateToFrontend),
	recurrenceRules: backend.recurrence_rules.map(mapRecurrenceRuleToFrontend)
});
