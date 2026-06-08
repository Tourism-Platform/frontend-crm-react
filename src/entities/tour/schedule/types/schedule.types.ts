export interface ISchedule {
	isSeasonal: boolean;
}

export interface IFixedDate {
	id: string;
	value: Date;
}

export interface IFixedDateCreate {
	value: Date;
}

export interface IExcludedDate {
	id: string;
	value: Date;
}

export interface IExcludedDateCreate {
	value: Date;
}

export interface IRecurrenceRule {
	id: string;
	day: number | null;
	validFrom: Date | null;
	validUntil: Date | null;
}

export interface IRecurrenceRuleCreate {
	day?: number | null;
	validFrom?: Date | null;
	validUntil?: Date | null;
}

export interface IGetScheduleArgs {
	tourId: string;
	from?: string;
	to?: string;
}

export interface IFullSchedule {
	schedule: ISchedule;
	fixedDates: IFixedDate[];
	excludedDates: IExcludedDate[];
	recurrenceRules: IRecurrenceRule[];
	occurrences: Date[];
	windowFrom: Date | null;
	windowUntil: Date | null;
}
